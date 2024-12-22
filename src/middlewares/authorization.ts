import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming Bearer token format

  if (!token) {
    res.status(401).json({ message: "Unauthorized: Token not provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      isAdmin: boolean;
    };
    req.user = { id: decoded.id, isAdmin: decoded.isAdmin }; // Attach user info to req.user
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token", error });
  }
};
