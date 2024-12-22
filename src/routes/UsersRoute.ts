import express from "express";
import {
  signUp,
  login,
  sendVerificationOTP,
  verifyEmailOTP,
  sendForgotPasswordOTP,
  resetPasswordWithOTP,
  uploadProfilePicture,
} from "../controllers/UsersController";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);

router.post("/send-verification-otp", sendVerificationOTP);
router.post("/verify-email", verifyEmailOTP);

router.post("/send-forgot-password-otp", sendForgotPasswordOTP);
router.post("/reset-password", resetPasswordWithOTP);

router.post("/upload-profile-picture", uploadProfilePicture);

export default router;
