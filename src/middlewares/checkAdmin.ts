import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/UsersModel";

export const checkAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get token from headers
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Unauthorized: Token not provided" });
      return;
    }

    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    // Fetch user from database
    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(401).json({ message: "Unauthorized: User not found" });
      return;
    }

    if (!user.isAdmin) {
      res.status(403).json({ message: "Forbidden: Admins only" });
      return;
    }

    // Proceed to the next middleware
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
