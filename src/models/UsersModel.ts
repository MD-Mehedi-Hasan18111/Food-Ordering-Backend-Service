import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin: false;
  isVerified: boolean;
  profilePicture: string;
  verificationOTP: string | null;
  verificationExpires: Date | null;
  passwordResetOTP: string | null;
  passwordResetExpires: Date | null;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: {type: String, required: true, default: false},
  isVerified: { type: Boolean, default: false },
  verificationOTP: { type: String, default: null },
  verificationExpires: { type: Date, default: null },
  passwordResetOTP: { type: String, default: null },
  passwordResetExpires: { type: Date, default: null },
  profilePicture: { type: String, default: "" },
});


export default mongoose.model<IUser>("User", UserSchema);
