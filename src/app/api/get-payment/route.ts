import { NextResponse } from "next/server";
import dbConnect from "../../../utils/mongodb";
import PaymentModel from "../../../models/Payment";

export async function GET(request: Request) {
  await dbConnect(); // Connect to MongoDB

  const url = new URL(request.url);
  const paymentId = url.searchParams.get("paymentId"); // Get the paymentId from query params

  if (!paymentId) {
    return new NextResponse(JSON.stringify({ message: "Missing paymentId" }), {
      status: 400,
    });
  }

  try {
    // Fetch the payment document by paymentId
    const payment = await PaymentModel.findOne({ paymentId });

    if (!payment) {
      return new NextResponse(
        JSON.stringify({ message: "Payment not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(payment), { status: 200 });
  } catch (error) {
    new NextResponse(
      JSON.stringify({ message: "Internal Server Error", error }),
      { status: 500 }
    );
    throw new Error("Failed to retrieve payment:");
  }
}
