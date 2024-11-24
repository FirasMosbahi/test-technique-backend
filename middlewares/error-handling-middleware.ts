import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/custom-error";

export function errorHandlerMiddleware(
  err: CustomError | Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof CustomError) {
    res.status(err.httpCode).json({ message: err.message });
  }
  res.status(500).json({ message: "Internal Server Error" });
}
