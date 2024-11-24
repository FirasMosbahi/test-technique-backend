import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Admin, { IAdmin } from "../models/admin";
import { CustomError } from "../utils/custom-error";

export class AdminService {
  static async registerAdmin(
    username: string,
    password: string,
  ): Promise<IAdmin> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ username, password: hashedPassword });
    return await admin.save();
  }

  static async loginAdmin(username: string, password: string): Promise<string> {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      throw new CustomError(400, "Invalid username or password");
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      throw new CustomError(400, "Invalid username or password");
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET ?? "secret",
      {
        expiresIn: "1h",
      },
    );
    return token;
  }
}
