import express from "express";
import {
  getAllOrders,
  getMyOrders,
  getSingleOrder,
  editOrderStatus,
  placeOrder,
} from "../controllers/OrdersController";
import { authenticateUser } from "../middlewares/authorization";
import { checkAdmin } from "../middlewares/checkAdmin";

const router = express.Router();

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders (Admin only)
 *     tags:
 *       - Orders
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all orders
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/", authenticateUser, checkAdmin, getAllOrders);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   put:
 *     summary: Edit the status of an order (Admin only)
 *     tags:
 *       - Orders
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Pending, Confirmed, Delivered, Cancelled]
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Order not found
 */
router.put("/:id/status", authenticateUser, checkAdmin, editOrderStatus);

/**
 * @swagger
 * /api/orders/my-orders/{userId}:
 *   get:
 *     summary: Get orders for a specific user
 *     tags:
 *       - Orders
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID for which to fetch orders
 *     responses:
 *       200:
 *         description: A list of the user's orders
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/my-orders/:userId", authenticateUser, getMyOrders);

/**
 * @swagger
 * /api/orders/{userId}/{id}:
 *   get:
 *     summary: Get the status of a specific order
 *     tags:
 *       - Orders
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order
 *     responses:
 *       200:
 *         description: Order status retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Order not found
 */
router.get("/:userId/:id", authenticateUser, getSingleOrder);

/**
 * @swagger
 * /api/orders/place-orders/{userId}:
 *   post:
 *     summary: Place an order for a specific user
 *     tags:
 *       - Orders
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user placing the order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     foodId:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *             required:
 *               - items
 *     responses:
 *       201:
 *         description: Order placed successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       400:
 *         description: Bad request
 */
router.post("/place-orders/:userId", authenticateUser, placeOrder);


export default router;
