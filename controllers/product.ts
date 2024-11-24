import { NextFunction, Request, Response } from "express";
import { ProductService } from "../services/product";

export class ProductController {
  static async getProducts(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const products = await ProductService.getProducts();
      res.status(200).json(products);
    } catch (e) {
      next(e);
    }
  }

  static async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const savedProduct = await ProductService.createProduct(req.body);
      res.status(201).json(savedProduct);
    } catch (e) {
      next(e);
    }
  }

  static async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedProduct = await ProductService.updateProduct(
        req.params.id,
        req.body,
      );
      console.log("here");
      console.log(updatedProduct);
      res.status(200).json(updatedProduct);
    } catch (e) {
      next(e);
    }
  }
  static async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedProduct = await ProductService.deleteProduct(req.params.id);
      res.status(204).json(deletedProduct);
    } catch (e) {
      next(e);
    }
  }
}
