import express from "express";
import {
  addReview,
  getReviewsForFood,
  deleteReview,
} from "../controllers/ReviewController";
import { authenticateUser } from "../middlewares/authorization";
import { checkAdmin } from "../middlewares/checkAdmin";

const router = express.Router();

/**
 * @swagger
 * /api/reviews/{userId}:
 *   post:
 *     summary: Add a review for a food item
 *     tags:
 *       - Reviews
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user adding the review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               foodId:
 *                 type: string
 *                 description: The ID of the food being reviewed
 *               rating:
 *                 type: integer
 *                 description: The rating for the food
 *               comment:
 *                 type: string
 *                 description: Additional comments for the review
 *             required:
 *               - foodId
 *               - rating
 *               - comment
 *     responses:
 *       201:
 *         description: Review added successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post("/:userId", authenticateUser, addReview);

/**
 * @swagger
 * /api/reviews/{foodId}:
 *   get:
 *     summary: Get all reviews for a specific food item
 *     tags:
 *       - Reviews
 *     parameters:
 *       - name: foodId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the food to fetch reviews for
 *     responses:
 *       200:
 *         description: A list of reviews for the specified food item
 *       404:
 *         description: Food not found or no reviews available
 */
router.get("/:foodId", getReviewsForFood);

/**
 * @swagger
 * /api/reviews/{userId}/{id}:
 *   delete:
 *     summary: Delete a specific review by a user
 *     tags:
 *       - Reviews
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user who wrote the review
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the review to delete
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Review not found
 */
router.delete("/:userId/:id", authenticateUser, deleteReview);

export default router;
