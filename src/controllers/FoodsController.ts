import { Request, Response } from "express";
import Food from "../models/FoodsModel";
import Review from "../models/ReviewModel";

export const getAllCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = await Food.distinct("category");
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAllFoods = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { category, search } = req.query;

    const filter: any = {};
    if (category) filter.category = category;
    if (search) filter.name = { $regex: search, $options: "i" }; // Case-insensitive search

    const foods = await Food.find(filter);
    res.status(200).json({ foods });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getSingleFoodWithReviews = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Find the food by ID
    const food = await Food.findById(id);
    if (!food) {
      res.status(404).json({ message: "Food not found" });
      return;
    }

    // Find and populate reviews
    const reviews = await Review.find({ foodId: id }).populate(
      "userId", // Populate user details
      "name profilePicture"
    );

    res.status(200).json({ success: true, food, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export const deleteFood = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedFood = await Food.findByIdAndDelete(id);
    if (!deletedFood) {
      res.status(404).json({ message: "Food not found" });
      return;
    }

    res.status(200).json({ message: "Food deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const addFood = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, category, price, description, imageUrl } = req.body;

    const newFood = new Food({ name, category, price, description, imageUrl });
    await newFood.save();

    res.status(201).json({ message: "Food added successfully", food: newFood });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const editFood = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, category, price, description, imageUrl } = req.body;

    const updatedFood = await Food.findByIdAndUpdate(
      id,
      { name, category, price, description, imageUrl },
      { new: true } // Return the updated document
    );

    if (!updatedFood) {
      res.status(404).json({ message: "Food not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Food updated successfully", food: updatedFood });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
