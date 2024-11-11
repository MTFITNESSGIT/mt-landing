import MercadoPagoConfig, { Payment } from "mercadopago";
import { revalidatePath } from "next/cache";
import PaymentModel from "../../../models/Payment";
import dbConnect from "../../../utils/mongodb";

const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(request: Request) {
  await dbConnect(); // Connect to MongoDB
  // Obtenemos el cuerpo de la petición que incluye información sobre la notificación
  const body: { data: { id: string } } = await request.json();

  // Obtenemos el pago
  const payment = await new Payment(mercadopago).get({ id: body.data.id });

  // Si se aprueba, agregamos el mensaje
  if (payment.status === "approved") {
    const newPayment = new PaymentModel({
      paymentId: body.data.id,
      status: payment.status,
      amount: payment.transaction_amount,
      download: 0,
    });
    await newPayment.save();

    revalidatePath("/");
  }

  // Respondemos con un estado 200 para indicarle que la notificación fue recibida
  return new Response(null, { status: 200 });
}
