import mongoose from "mongoose";
import { bootstrapDatabase } from "../bootstrap-database/bootstrap";

export default async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI ?? "");
    console.log(`MongoDB connected`);
    await bootstrapDatabase();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
}
