import MercadoPagoConfig, { Payment } from "mercadopago";
import PaymentModel from "../../../models/Payment";
import dbConnect from "../../../utils/mongodb";
import { Resend } from "resend";
import { getMimeType } from "@/utils/getMimeType";
import { bucket } from "@/utils/firebaseBucket";

const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(request: Request) {
  await dbConnect();

  const body: { data: { id: string } } = await request.json();

  // Early return to avoid Vercel 504 timeout
  const earlyResponse = new Response("OK", { status: 200 });

  // Continue async logic in background
  process.nextTick(async () => {
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
      const payment = await new Payment(mercadopago).get({ id: body.data.id });

      if (payment.status !== "approved") return;

      // Check if payment already exists
      const existingPayment = await PaymentModel.findOne({
        paymentId: payment.id,
      });

      if (!existingPayment) {
        const newPayment = new PaymentModel({
          paymentId: payment.id,
          status: payment.status,
          amount: payment.transaction_amount,
          email: payment.payer?.email,
          name:
            payment.payer?.first_name && payment.payer?.last_name
              ? `${payment.payer.first_name} ${payment.payer.last_name}`
              : undefined,
          phone:
            payment.payer?.phone?.area_code && payment.payer?.phone?.number
              ? payment.payer.phone.area_code + payment.payer.phone.number
              : undefined,
          date_created: new Date(payment.date_created as string),
          date_approved: new Date(payment.date_approved as string),
          emailSent: false,
        });

        await newPayment.save();
      } else {
        console.log("Payment already recorded, skipping DB save.");
      }

      // Check and send email if not already sent
      const paymentRecord =
        existingPayment ||
        (await PaymentModel.findOne({ paymentId: payment.id }));
      if (!paymentRecord?.emailSent) {
        const planType = payment.metadata?.plan?.type;
        const planCategory = payment.metadata?.plan?.category;

        if (!planType || !planCategory) {
          throw new Error("Missing plan type or category in payment metadata.");
        }

        // 🔐 Safe Firebase file fetch
        let attachments: any[] = [];
        try {
          const firebaseFolder = `MusculoPrincipiante`;
          const [files] = await bucket.getFiles({ prefix: firebaseFolder });
          const pdfFiles = files.filter((file) => !file.name.endsWith("/"));

          attachments = await Promise.all(
            pdfFiles.map(async (file) => {
              const [buffer] = await file.download();
              const filename = file.name.split("/").pop() || "file.pdf";
              return {
                filename,
                content: buffer.toString("base64"),
                contentType: getMimeType(filename),
                encoding: "base64",
              };
            })
          );
        } catch (fileErr) {
          console.error("❌ Error downloading files from Firebase:", fileErr);
        }

        if (attachments.length === 0) {
          console.warn("⚠️ No attachments found — skipping email send.");
          return;
        }

        // ✅ Send confirmation email
        await resend.emails.send({
          from: "soporte@tomymedina.com",
          to: payment.payer?.email || "juansegundomartinez7@gmail.com",
          subject: "Payment Confirmation",
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="text-align: center; margin-bottom: 20px;">
                <img src="https://www.tomymedina.com/imgs/logo.webp" alt="Logo" style="max-width: 150px;" />
              </div>
              <h1 style="color: #333; text-align: center;">¡Pago Exitoso!</h1>
              <div style="background-color: #f8f8f8; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <p style="margin: 10px 0;">¡Gracias por tu compra!</p>
                <p style="margin: 10px 0;">Adjuntamos el plan ${planType} - ${planCategory}</p>
              </div>
              <p style="text-align: center; color: #666;">Si tienes alguna duda, contacta con nuestro equipo de soporte.</p>
            </div>
          `,
          attachments,
        });

        // ✅ Mark email as sent
        paymentRecord.emailSent = true;
        await paymentRecord.save();

        console.log("✅ Confirmation email sent successfully");
      } else {
        console.log("Email already sent, skipping.");
      }
    } catch (error) {
      console.error("❌ Error handling MercadoPago webhook:", error);
    }
  });

  return earlyResponse;
}
