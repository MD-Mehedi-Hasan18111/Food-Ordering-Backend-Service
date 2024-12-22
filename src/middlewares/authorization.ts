import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized: Token not provided" });
    return;
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!); // Just verify the token without attaching to req
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token", error });
  }
};
