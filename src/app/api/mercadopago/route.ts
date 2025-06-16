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
              <html>
      <body style="margin: 0; padding: 0; background-color: #000000;" bgcolor="#000000">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" bgcolor="#000000" style="background-color: #000000; width: 100%;">
          <tr>
            <td align="center">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #000000; padding: 30px; border-radius: 10px;">
                <tr>
                  <td align="center" style="padding-bottom: 30px;">
                    <img src="https://www.tomymedina.com/imgs/logo.png" alt="Logo" style="max-width: 140px;" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <h1 style="color: #ff4d4d; text-align: center; font-size: 28px; margin-bottom: 20px; font-family: Arial, sans-serif;">
                      ¡Muchas gracias por tu compra!
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #1a1a1a; border-radius: 8px; padding: 20px; text-align: center;">
                    <p style="margin: 10px 0; font-size: 16px; color: #ffffff; font-family: Arial, sans-serif;">
                      Te agradezco por confiar en mí para acompañarte en tu proceso de entrenamiento.
                    </p>
                    <p style="margin: 10px 0; font-size: 16px; color: #ffffff; font-family: Arial, sans-serif;">
                      Te adjunto el plan <strong>${payment.metadata.title} Nivel ${payment.metadata.category}</strong>
                    </p>
                    <p style="margin: 10px 0; font-size: 14px; color: #cccccc; font-family: Arial, sans-serif;">
                      Cualquier duda que tengas, no dudes en escribirme. ¡Estoy para ayudarte!
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center; font-size: 12px; color: #777777; margin-top: 30px; padding-top: 30px; font-family: Arial, sans-serif;">
                    © 2025 Tomy Medina | Todos los derechos reservados
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>

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
