import express from "express";
import {
  getAllCategories,
  getAllFoods,
  getSingleFoodWithReviews,
  deleteFood,
  addFood,
  editFood,
} from "../controllers/FoodsController";
import { checkAdmin } from "../middlewares/checkAdmin";
import { authenticateUser } from "../middlewares/authorization";

const router = express.Router();

// Foods Routes
router.get("/categories", authenticateUser, getAllCategories);
router.get("/", authenticateUser, getAllFoods);
router.get("/:id", authenticateUser, getSingleFoodWithReviews);

router.delete("/:id", authenticateUser, checkAdmin, deleteFood);
router.post("/", authenticateUser, checkAdmin, addFood);
router.put("/:id", authenticateUser, checkAdmin, editFood);

export default router;
