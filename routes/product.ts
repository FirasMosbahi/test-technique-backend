import { Router } from "express";
import { ProductController } from "../controllers/product";
import { authenticateAdminMiddleware } from "../middlewares/auth-middleware";

const productRouter = Router();

productRouter.get("/", ProductController.getProducts);
productRouter.post(
  "/",
  authenticateAdminMiddleware,
  ProductController.createProduct,
);
productRouter.patch(
  "/:id",
  authenticateAdminMiddleware,
  ProductController.updateProduct,
);
productRouter.delete(
  "/:id",
  authenticateAdminMiddleware,
  ProductController.deleteProduct,
);

export default productRouter;
