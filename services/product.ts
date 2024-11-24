import { UpdateQuery, Types } from "mongoose";

import Product, { IProduct } from "../models/product";
import { CustomError } from "../utils/custom-error";
import { emitSocketEvent } from "./socket-service";

export class ProductService {
  static async getProducts(): Promise<IProduct[]> {
    return Product.find();
  }

  static async createProduct(product: IProduct): Promise<IProduct> {
    const createdProduct = new Product(product);
    const savedProduct: IProduct = await createdProduct.save();
    emitSocketEvent("productAdded", savedProduct);
    return savedProduct;
  }

  static async updateProduct(
    id: string,
    updatedProduct: UpdateQuery<IProduct>,
  ): Promise<IProduct | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new CustomError(400, "invalid id format");
    }

    const product = Product.findByIdAndUpdate(
      new Types.ObjectId(id),
      updatedProduct,
      { new: true },
    );
    emitSocketEvent("productUpdated", updatedProduct as IProduct | null);
    return product;
  }

  static async deleteProduct(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new CustomError(400, "invalid id format");
    }
    const product = await Product.findByIdAndDelete(new Types.ObjectId(id));
    console.log(product);
    emitSocketEvent("productDeleted", product);
    console.log("emitted");
    return product;
  }
}
