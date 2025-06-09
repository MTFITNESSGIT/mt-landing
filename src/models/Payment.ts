import mongoose, { Schema, Document } from "mongoose";

interface IPayment extends Document {
  paymentId: string;
  status: string;
  amount: number;
  email: string;
  name?: string;
  phone: string;
  date_created: Date;
  date_approved: Date;
}

const PaymentSchema: Schema = new Schema({
  paymentId: { type: String, required: true, unique: true },
  status: { type: String, required: true },
  amount: { type: Number, required: true },
  email: { type: String, required: true },
  name: { type: String, required: false },
  phone: { type: String, required: false },
  date_created: { type: Date, required: true },
  date_approved: { type: Date, required: true },
});

export default mongoose.models.Payment ||
  mongoose.model<IPayment>("Payment", PaymentSchema);
