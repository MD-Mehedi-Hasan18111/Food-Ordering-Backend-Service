import express from "express";
import {
  signUp,
  login,
  sendVerificationOTP,
  verifyEmailOTP,
  sendForgotPasswordOTP,
  resetPasswordWithOTP,
  uploadProfilePicture,
  getAllUsers,
  getUserDetails,
  editUserName,
} from "../controllers/UsersController";
import { checkAdmin } from "../middlewares/checkAdmin";
import { authenticateUser } from "../middlewares/authorization";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);

router.post("/send-verification-otp", sendVerificationOTP);
router.post("/verify-email", verifyEmailOTP);

router.post("/send-forgot-password-otp", sendForgotPasswordOTP);
router.post("/reset-password", resetPasswordWithOTP);

router.post("/upload-profile-picture", uploadProfilePicture);

router.get("/users", authenticateUser, checkAdmin, getAllUsers);
router.get("/users/:id", authenticateUser, getUserDetails);
router.put("/users/:id/edit/name", authenticateUser, editUserName);


export default router;
