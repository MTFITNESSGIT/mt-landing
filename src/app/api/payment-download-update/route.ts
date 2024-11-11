import { NextResponse } from "next/server";
import dbConnect from "../../../utils/mongodb";
import PaymentModel from "../../../models/Payment";

export async function POST(request: Request) {
  await dbConnect(); // Connect to MongoDB

  const body = await request.json();
  const { paymentId, download } = body;

  if (!paymentId || download === undefined) {
    return new NextResponse(JSON.stringify({ message: "Invalid input data" }), {
      status: 400,
    });
  }

  const value = download === 1 ? 1 : 2;

  try {
    // Update download field by incrementing it by 1
    const result = await PaymentModel.updateOne(
      { paymentId },
      { $inc: { download: value } }
    );

    if (result.modifiedCount === 0) {
      return new NextResponse(
        JSON.stringify({ message: "Payment not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Download count updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update download count:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
