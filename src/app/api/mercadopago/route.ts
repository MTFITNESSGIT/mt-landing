import MercadoPagoConfig, { Payment } from "mercadopago";
import PaymentModel from "../../../models/Payment";
import dbConnect from "../../../utils/mongodb";
import { Resend } from "resend";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import { getMimeType } from "@/utils/getMimeType";

const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  await dbConnect();
  const body: { data: { id: string } } = await request.json();

  const payment = await new Payment(mercadopago).get({ id: body.data.id });

  if (payment.status === "approved") {
    const newPayment = new PaymentModel({
      paymentId: body.data.id,
      status: payment.status,
      amount: payment.transaction_amount,
      download: 0,
    });
    await newPayment.save();

    try {
      const planType = payment.metadata?.plan?.type;
      const planCategory = payment.metadata?.plan?.category;

      if (!planType || !planCategory) {
        throw new Error("Missing plan type or category in payment metadata.");
      }

      const folderPath = join(process.cwd(), "private", planType, planCategory);

      const filenames = readdirSync(folderPath);

      const attachments = filenames.map((filename) => {
        const filePath = join(folderPath, filename);
        const fileBuffer = readFileSync(filePath);

        return {
          filename,
          content: fileBuffer.toString("base64"),
          contentType: getMimeType(filename),
          encoding: "base64",
        };
      });

      await resend.emails.send({
        from: "soporte@tomymedina.com",
        to: "juansegundomartinez7@gmail.com",
        subject: "Payment Confirmation",
        html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://wwww.tomymedina.com/imgs/logo.webp" alt="Logo" style="max-width: 150px;" />
          </div>
          <h1 style="color: #333; text-align: center;">¡Pago Exitoso!</h1>
          <div style="background-color: #f8f8f8; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <p style="margin: 10px 0;">¡Gracias por tu compra!</p>
            <p style="margin: 10px 0;">Adjuntamos el plan${planType} - ${planCategory}</p>  
          </div>
          <p style="text-align: center; color: #666;">Si tienes alguna duda, contacta con nuestro equipo de soporte.</p>
        </div>
      `,
        attachments,
      });
      console.log("Confirmation email sent successfully");
    } catch (error) {
      console.error("Error sending confirmation email:", error);
    }

    // revalidatePath("/");
  }

  return new Response(null, { status: 200 });
}
