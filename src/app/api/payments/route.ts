import dbConnect from "@/utils/mongodb";
import { NextResponse } from "next/server";
import PaymentModel from "../../../models/Payment";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const skip = (page - 1) * limit;

    const [total, users] = await Promise.all([
      PaymentModel.countDocuments(),
      PaymentModel.find().skip(skip).limit(limit),
    ]);

    return NextResponse.json({
      data: users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error", error }),
      { status: 500 }
    );
  }
}
