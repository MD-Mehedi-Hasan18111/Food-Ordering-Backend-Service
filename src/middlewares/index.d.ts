import express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; isAdmin?: boolean }; // Add user property to the Request type
    }
  }
}
