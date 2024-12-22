import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import userRoutes from './routes/UsersRoute';
import foodRoutes from './routes/FoodsRoute';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/foods", foodRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
