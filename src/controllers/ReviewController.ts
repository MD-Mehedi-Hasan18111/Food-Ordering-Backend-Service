import { Request, Response } from "express";
import Review from "../models/ReviewModel";
import Food from "../models/FoodsModel";

// Add a new review
export const addReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { foodId, rating, comment } = req.body;
    const { userId } = req.params;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized: User not logged in" });
      return;
    }

    // Check if the food exists
    const food = await Food.findById(foodId);
    if (!food) {
      res.status(404).json({ message: "Food not found" });
      return;
    }

    // Create and save the review
    const review = new Review({ userId, foodId, rating, comment });
    await review.save();

    res.status(201).json({ success: true, message: "Review added", review });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Get all reviews for a specific food
export const getReviewsForFood = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { foodId } = req.params;

    const reviews = await Review.find({ foodId }).populate(
      "userId",
      "name email"
    );
    res.status(200).json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Delete a specific review
export const deleteReview = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, id } = req.params;

    // Find the review
    const review = await Review.findById(id);
    if (!review) {
      res.status(404).json({ message: "Review not found" });
      return;
    }

    // Only allow the user to delete own review
    if (review.userId.toString() !== userId) {
      res
        .status(403)
        .json({ message: "Forbidden: Not authorized to delete this review" });
      return;
    }

    await review.deleteOne();
    res.status(200).json({ success: true, message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
