import express from "express";
import {
  addReview,
  getReviewsForFood,
  deleteReview,
} from "../controllers/ReviewController";
import { authenticateUser } from "../middlewares/authorization";
import { checkAdmin } from "../middlewares/checkAdmin";

const router = express.Router();

// User routes
router.post("/", authenticateUser, addReview);
router.get("/:foodId", getReviewsForFood);
router.delete("/:id", authenticateUser, deleteReview);

export default router;
