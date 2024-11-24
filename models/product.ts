import mongoose, { Schema, Document } from "mongoose";

export class IProduct extends Document {
  name: string;
  type: string;
  price: number;
  rating: number;
  warranty_years: number;
  available: boolean;
}

const productSchema: Schema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  warranty_years: { type: Number, required: true },
  available: { type: Boolean, required: true },
});

export default mongoose.model<IProduct>("Product", productSchema);
