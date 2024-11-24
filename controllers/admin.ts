import { Request, Response, NextFunction } from "express";
import { AdminService } from "../services/admin";

export class AdminController {
  static async registerAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const admin = await AdminService.registerAdmin(username, password);
      res.status(201).json({ message: "Admin registered successfully", admin });
    } catch (err) {
      next(err);
    }
  }

  static async loginAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const token = await AdminService.loginAdmin(username, password);
      res.status(200).json({ token });
    } catch (err) {
      next(err);
    }
  }
}
