import express from "express";
import {
  getAllOrders,
  getMyOrders,
  getOrderStatus,
  editOrderStatus,
  placeOrder,
} from "../controllers/OrdersController";
import { authenticateUser } from "../middlewares/authorization";
import { checkAdmin } from "../middlewares/checkAdmin";

const router = express.Router();

// Admin routes
router.get("/", authenticateUser, checkAdmin, getAllOrders);
router.put("/:id/status", authenticateUser, checkAdmin, editOrderStatus);

// User routes
router.get("/my-orders", authenticateUser, getMyOrders);
router.get("/:id", authenticateUser, getOrderStatus);

router.post("/place-orders", authenticateUser, placeOrder);

export default router;
