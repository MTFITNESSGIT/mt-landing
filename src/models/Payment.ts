import mongoose, { Schema, Document } from "mongoose";

interface IPayment extends Document {
  paymentId: string;
  status: string;
  amount: number;
  date: Date;
}

const PaymentSchema: Schema = new Schema({
  paymentId: { type: String, required: true, unique: true },
  status: { type: String, required: true },
  amount: { type: Number, required: true },
  download: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.models.Payment ||
  mongoose.model<IPayment>("Payment", PaymentSchema);
