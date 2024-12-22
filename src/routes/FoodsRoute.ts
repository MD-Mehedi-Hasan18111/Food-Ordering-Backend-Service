import express from "express";
import {
  getAllCategories,
  getAllFoods,
  getSingleFoodWithReviews,
  deleteFood,
  addFood,
  editFood,
  updateFoodAvailability,
} from "../controllers/FoodsController";
import { checkAdmin } from "../middlewares/checkAdmin";
import { authenticateUser } from "../middlewares/authorization";

const router = express.Router();

/**
 * @swagger
 * /api/foods/categories:
 *   get:
 *     summary: Get all categories
 *     tags:
 *       - Foods
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved categories
 *       401:
 *         description: Unauthorized
 */
router.get("/categories", authenticateUser, getAllCategories);
/**
 * @swagger
 * /api/foods:
 *   get:
 *     summary: Get all foods
 *     tags:
 *       - Foods
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved foods
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticateUser, getAllFoods);
/**
 * @swagger
 * /api/foods/{id}:
 *   get:
 *     summary: Get a single food item with reviews
 *     tags:
 *       - Foods
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the food item
 *     responses:
 *       200:
 *         description: Successfully retrieved the food item
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Food not found
 */
router.get("/:id", authenticateUser, getSingleFoodWithReviews);

/**
 * @swagger
 * /api/foods/{id}:
 *   delete:
 *     summary: Delete a food item
 *     tags:
 *       - Foods
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the food item to delete
 *     responses:
 *       200:
 *         description: Food item deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Food item not found
 */
router.delete("/:id", authenticateUser, checkAdmin, deleteFood);

/**
 * @swagger
 * /api/foods:
 *   post:
 *     summary: Add a new food item
 *     tags:
 *       - Foods
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *             required:
 *               - name
 *               - price
 *               - category
 *               - imageUrl
 *     responses:
 *       201:
 *         description: Food item added successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       400:
 *         description: Bad request
 */
router.post("/", authenticateUser, checkAdmin, addFood);

/**
 * @swagger
 * /api/foods/{id}:
 *   put:
 *     summary: Edit a food item
 *     tags:
 *       - Foods
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the food item to edit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Food item updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Food item not found
 */
router.put("/:id", authenticateUser, checkAdmin, editFood);

/**
 * @swagger
 * /api/foods/{id}/availability:
 *   put:
 *     summary: Update food availability
 *     tags:
 *       - Foods
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the food item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               available:
 *                 type: boolean
 *             required:
 *               - available
 *     responses:
 *       200:
 *         description: Food availability updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Food item not found
 */
router.put(
  "/:id/availability",
  authenticateUser,
  checkAdmin,
  updateFoodAvailability
);

export default router;
