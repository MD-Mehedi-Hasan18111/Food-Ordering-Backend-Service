import { Request, Response } from "express";
import Order from "../models/OrdersModel";
import { Types } from "mongoose";
import Food from "../models/FoodsModel";

// Admin: Get all orders with search and filter
export const getAllOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { status, userId } = req.query;

    const filter: any = {};
    if (status) filter.status = status;
    if (userId) filter.userId = userId;

    const orders = await Order.find(filter).populate("items.foodId");
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// User: Get my orders with search and filter
export const getMyOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized: User not logged in" });
      return;
    }

    const { status } = req.query;

    const filter: any = { userId };
    if (status) filter.status = status;

    const orders = await Order.find(filter).populate("items.foodId");
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// User: Get single order track status
export const getOrderStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid order ID" });
      return;
    }

    const order = await Order.findById(id).populate("items.foodId");
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    if (order.userId !== req.user?.id) {
      res.status(403).json({ message: "Forbidden: Not your order" });
      return;
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Admin: Edit order status
export const editOrderStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid order ID" });
      return;
    }

    const order = await Order.findById(id);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    order.status = status;
    await order.save();

    res
      .status(200)
      .json({ success: true, message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export const placeOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { items } = req.body;

    if (!userId) {
      res
        .status(401)
        .json({ success: false, message: "Unauthorized: User not logged in" });
      return;
    }

    if (!items || items.length === 0) {
      res
        .status(400)
        .json({ success: false, message: "No items in the order" });
      return;
    }

    // Calculate total price and validate items
    let totalPrice = 0;
    for (const item of items) {
      const food = await Food.findById(item.foodId);
      if (!food) {
        res
          .status(404)
          .json({
            success: false,
            message: `Food item not found: ${item.foodId}`,
          });
        return;
      }
      totalPrice += food.price * item.quantity;
    }

    // Create a new order
    const order = new Order({
      userId,
      items,
      totalPrice,
      status: "Pending",
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
