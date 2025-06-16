import MercadoPagoConfig, { Payment } from "mercadopago";
import PaymentModel from "../../../models/Payment";
import dbConnect from "../../../utils/mongodb";
import { Resend } from "resend";
import { getMimeType } from "@/utils/getMimeType";
import { bucket } from "@/utils/firebaseBucket";
import { NextResponse } from "next/server";

const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(request: Request) {
  await dbConnect();

  const body: { data: { id: string } } = await request.json();

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const payment = await new Payment(mercadopago).get({ id: body.data.id });

    if (payment.status !== "approved") {
      console.log("⛔ Payment is not approved, exiting.");
      return NextResponse.json(
        {
          message: "⛔ Payment is not approved, exiting.",
        },
        { status: 400 }
      );
    }

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
      });

      await newPayment.save();
      console.log("💾 Payment saved to database.");
    } else {
      console.log("ℹ️ Payment already recorded.");
    }

    const paymentRecord =
      existingPayment ||
      (await PaymentModel.findOne({ paymentId: payment.id }));

    const firebaseFolder = payment.metadata.firebase_folder || "";

    const [files] = await bucket.getFiles({ prefix: firebaseFolder });
    const pdfFiles = files.filter((file) => !file.name.endsWith("/"));

    const attachments = await Promise.all(
      pdfFiles.map(async (file) => {
        const [buffer] = await file.download();
        const filename = file.name.split("/").pop() || "archivo.pdf";
        return {
          filename,
          content: buffer.toString("base64"),
          contentType: getMimeType(filename),
          encoding: "base64",
        };
      })
    );

    console.log(firebaseFolder);

    if (attachments.length === 0) {
      console.error("❌ No files found for attachments. Aborting email.");
      return NextResponse.json(
        {
          message: "No files found for attachments. Aborting email.",
        },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "soporte@tomymedina.com",
      // to: payment.payer?.email || "",
      to: "juansegundomartinez7@gmail.com",
      subject: "Pago Exitoso",
      html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="text-align: center; margin-bottom: 20px;">
                  <img src="https://www.tomymedina.com/imgs/logo.webp" alt="Logo" style="max-width: 150px;" />
                </div>
                <h1 style="color: #333; text-align: center;">¡Pago Exitoso!</h1>
                <div style="background-color: #f8f8f8; border-radius: 8px; padding: 20px; margin: 20px 0;">
                  <p style="margin: 10px 0;">¡Gracias por tu compra!</p>
                  <p style="margin: 10px 0;">Adjuntamos el plan </p>
                </div>
              </div>
            `,
      attachments,
    });

    paymentRecord.emailSent = true;
    await paymentRecord.save();

    return NextResponse.json({
      message: "Emails processed",
    });
  } catch (error) {
    console.error("❌ Error in MercadoPago webhook logic:", error);

    return NextResponse.json(error, { status: 500 });
  }
}
