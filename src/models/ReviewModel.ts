import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  foodId: mongoose.Schema.Types.ObjectId;
  rating: number; // Rating out of 5
  comment: string;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  foodId: { type: Schema.Types.ObjectId, ref: "Food", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IReview>("Review", ReviewSchema);
