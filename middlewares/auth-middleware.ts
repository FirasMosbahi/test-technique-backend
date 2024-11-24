import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/admin";
import { Types } from "mongoose";

export async function authenticateAdminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "No token provided." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    const admin = await Admin.findById(new Types.ObjectId(decoded.id));

    if (!admin) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    next();
  } catch (err) {
    res.status(401).json({ message: err });
    return;
  }
}
