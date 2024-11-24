import { Router } from "express";
import { AdminController } from "../controllers/admin";
import { authenticateAdminMiddleware } from "../middlewares/auth-middleware";

const adminRouter = Router();

adminRouter.post(
  "/register",
  authenticateAdminMiddleware,
  AdminController.registerAdmin,
);

adminRouter.post("/login", AdminController.loginAdmin);

export default adminRouter;
