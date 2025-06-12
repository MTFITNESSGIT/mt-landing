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

  void (async () => {
    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
      await resend.emails.send({
        from: "soporte@tomymedina.com",
        to: "juansegundomartinez7@gmail.com",
        subject: "Pago Exitoso",
        html: `
              Test
            `,
      });

      const payment = await new Payment(mercadopago).get({ id: body.data.id });

      if (payment.status !== "approved") {
        console.log("⛔ Payment is not approved, exiting.");
        return;
      }

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
        console.log("💾 Payment saved to database.");
      } else {
        console.log("ℹ️ Payment already recorded.");
      }

      const paymentRecord =
        existingPayment ||
        (await PaymentModel.findOne({ paymentId: payment.id }));

      if (!paymentRecord?.emailSent) {
        const planType = payment.metadata?.plan?.type;
        const planCategory = payment.metadata?.plan?.category;

        if (!planType || !planCategory) {
          console.error("❌ Missing plan metadata.");
          return;
        }

        const firebaseFolder = `MusculoPrincipiante`;
        const [files] = await bucket.getFiles({ prefix: firebaseFolder });
        const pdfFiles = files.filter((file) => !file.name.endsWith("/"));

        console.log(
          "✅ Firebase files:",
          pdfFiles.map((f) => f.name)
        );

        const attachments = await Promise.all(
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

        if (attachments.length === 0) {
          console.error("❌ No files found for attachments. Aborting email.");
          return;
        }

        try {
          const result = await resend.emails.send({
            from: "soporte@tomymedina.com",
            to: payment.payer?.email || "juansegundomartinez7@gmail.com",
            subject: "Pago Exitoso",
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

          console.log("📧 Resend response:", result);

          paymentRecord.emailSent = true;
          await paymentRecord.save();
          console.log("✅ Email sent and DB updated.");
        } catch (emailError) {
          console.error("❌ Error sending email via Resend:", emailError);
        }
      } else {
        console.log("📨 Email already sent.");
      }
    } catch (error) {
      console.error("❌ Error in MercadoPago webhook logic:", error);
    }
  })();
}
