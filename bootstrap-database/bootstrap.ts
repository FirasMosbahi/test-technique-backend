import Product from "../models/product";
import Admin from "../models/admin";
import bcrypt from "bcrypt";
import { initialProducts } from "./data";

export async function bootstrapDatabase() {
  try {
    const existingProducts = await Product.find();
    if (existingProducts.length === 0) {
      await Product.insertMany(initialProducts);
      console.log("Initial products added to the database.");
    } else {
      console.log("Products already exist. Skipping product bootstrap.");
    }

    const adminExists = await Admin.findOne({ username: "admin" });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin", 10);
      const admin = new Admin({
        username: "admin",
        password: hashedPassword,
      });
      await admin.save();
      console.log("Default admin user created.");
    } else {
      console.log("Admin user already exists. Skipping admin bootstrap.");
    }
  } catch (error) {
    console.error("Error during database bootstrap:", error);
  }
}
