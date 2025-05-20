import MercadoPagoConfig, { Payment } from "mercadopago";
import { revalidatePath } from "next/cache";
import PaymentModel from "../../../models/Payment";
import dbConnect from "../../../utils/mongodb";
import { Resend } from "resend";

const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  await dbConnect(); // Connect to MongoDB
  const body: { data: { id: string } } = await request.json();

  const payment = await new Payment(mercadopago).get({ id: body.data.id });

  // console.log(payment.payer.email);

  if (payment.status === "approved") {
    const newPayment = new PaymentModel({
      paymentId: body.data.id,
      status: payment.status,
      amount: payment.transaction_amount,
      download: 0,
    });
    await newPayment.save();

    try {
      await resend.emails.send({
        from: "orders@yourdomain.com", // Update with your verified domain
        to: "juansegundomartinez76@gmail.com",
        subject: "Payment Confirmation",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333; text-align: center;">Payment Successful!</h1>
            <div style="background-color: #f8f8f8; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <p style="margin: 10px 0;">Thank you for your purchase!</p>
              <p style="margin: 10px 0;">Payment ID: ${body.data.id}</p>
              <p style="margin: 10px 0;">Amount: $${payment.transaction_amount}</p>
              <p style="margin: 10px 0;">Status: ${payment.status}</p>
            </div>
            <p style="text-align: center; color: #666;">If you have any questions, please contact our support team.</p>
          </div>
        `,
      });
      console.log("Confirmation email sent successfully");
    } catch (error) {
      console.error("Error sending confirmation email:", error);
    }

    // revalidatePath("/");
  }

  return new Response(null, { status: 200 });
}
