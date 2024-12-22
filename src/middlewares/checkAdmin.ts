import { Request, Response, NextFunction } from "express";
import User from "../models/UsersModel";

export const checkAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id; // Assuming `req.user` contains the authenticated user's ID

    if (!userId) {
      res.status(401).json({ message: "Unauthorized: User not logged in" });
      return;
    }

    const user = await User.findById(userId);

    if (!user || !user.isAdmin) {
      // Assuming 'role' exists on your User model
      res.status(403).json({ message: "Forbidden: Admins only" });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
