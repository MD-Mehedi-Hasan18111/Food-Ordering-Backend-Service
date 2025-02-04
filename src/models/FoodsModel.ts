import mongoose, { Schema, Document } from "mongoose";

export interface IFood extends Document {
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  available: boolean;
}

const FoodSchema = new Schema<IFood>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  available: { type: Boolean, required: true, default: true },
});

export default mongoose.model<IFood>("Food", FoodSchema);
