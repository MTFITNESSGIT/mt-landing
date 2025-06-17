import mongoose, { Schema, Document } from "mongoose";

interface IPayment extends Document {
  paymentId: string;
  status: string;
  amount: number;
  email: string;
  name?: string;
  phone: string;
  title: string;
  firebase_folder: string;
  category: string;
  date_created: Date;
  date_approved: Date;
}

const PaymentSchema: Schema = new Schema({
  paymentId: { type: String, required: true, unique: true },
  status: { type: String, required: true },
  amount: { type: Number, required: true },
  email: { type: String, required: true },
  name: { type: String, required: false },
  title: { type: String, required: true },
  category: { type: String, required: true },
  firebase_folder: { type: String, required: true },
  phone: { type: String, required: false },
  date_created: { type: Date, required: true },
  date_approved: { type: Date, required: true },
});

export default mongoose.models.Payment ||
  mongoose.model<IPayment>("Payment", PaymentSchema);
