import mongoose, { Schema, Document } from "mongoose";

export interface IFood extends Document {
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  reviews: { user: string; comment: string; rating: number }[];
}

const FoodSchema = new Schema<IFood>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  reviews: [
    {
      user: { type: String, required: true },
      comment: { type: String, required: true },
      rating: { type: Number, required: true },
    },
  ],
});

export default mongoose.model<IFood>("Food", FoodSchema);
