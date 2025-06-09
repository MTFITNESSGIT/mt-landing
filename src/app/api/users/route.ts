import dbConnect from "@/utils/mongodb";
import { NextResponse } from "next/server";
import PaymentModel from "../../../models/Payment";

export async function GET() {
  try {
    await dbConnect();
    const users = await PaymentModel.find();
    return NextResponse.json(users);
  } catch (error) {
    new NextResponse(
      JSON.stringify({ message: "Internal Server Error", error }),
      { status: 500 }
    );
    throw new Error("Failed to retrieve payment:");
  }
}
