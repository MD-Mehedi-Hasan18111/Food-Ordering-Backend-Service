import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  profilePicture?: string;
  verified: boolean;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  profilePicture: { type: String },
  verified: { type: Boolean, default: false },
});

export default mongoose.model<IUser>("User", UserSchema);
