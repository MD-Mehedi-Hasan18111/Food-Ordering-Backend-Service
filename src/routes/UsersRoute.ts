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

/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's full name
 *               email:
 *                 type: string
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *       409:
 *         description: User already exists
 */
router.post("/signup", signUp);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Log in a user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized (Invalid credentials)
 */
router.post("/login", login);

/**
 * @swagger
 * /api/users/send-verification-otp:
 *   post:
 *     summary: Send OTP for email verification
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       400:
 *         description: Bad request
 */
router.post("/send-verification-otp", sendVerificationOTP);

/**
 * @swagger
 * /api/users/verify-email:
 *   post:
 *     summary: Verify email using OTP
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *               otp:
 *                 type: string
 *                 description: OTP sent to the user's email
 *             required:
 *               - email
 *               - otp
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Invalid OTP
 */
router.post("/verify-email", verifyEmailOTP);

/**
 * @swagger
 * /api/users/send-forgot-password-otp:
 *   post:
 *     summary: Send OTP for password reset
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       400:
 *         description: Bad request
 */
router.post("/send-forgot-password-otp", sendForgotPasswordOTP);

/**
 * @swagger
 * /api/users/reset-password:
 *   post:
 *     summary: Reset password using OTP
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *               otp:
 *                 type: string
 *                 description: OTP sent to the user's email
 *               newPassword:
 *                 type: string
 *                 description: The new password
 *             required:
 *               - email
 *               - otp
 *               - newPassword
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Invalid OTP
 */
router.post("/reset-password", resetPasswordWithOTP);

/**
 * @swagger
 * /api/users/upload-profile-picture:
 *   post:
 *     summary: Upload profile picture
 *     tags:
 *       - Authentication
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *               imageUrl:
 *                 type: string
 *                 description: new profile image url
 *             required:
 *               - email
 *               - imageUrl
 *     responses:
 *       200:
 *         description: Profile picture uploaded successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/upload-profile-picture", uploadProfilePicture);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - User Management
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: User ID
 *                   name:
 *                     type: string
 *                     description: User's name
 *                   email:
 *                     type: string
 *                     description: User's email
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin access required)
 */
router.get("/users", authenticateUser, checkAdmin, getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get details of a specific user
 *     tags:
 *       - User Management
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Details of the specified user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: User ID
 *                 name:
 *                   type: string
 *                   description: User's name
 *                 email:
 *                   type: string
 *                   description: User's email
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.get("/users/:id", authenticateUser, getUserDetails);

/**
 * @swagger
 * /api/users/{id}/edit/name:
 *   put:
 *     summary: Edit a user's name
 *     tags:
 *       - User Management
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: New name for the user
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: User name updated successfully
 *       400:
 *         description: Bad request (e.g., missing or invalid data)
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.put("/users/:id/edit/name", authenticateUser, editUserName);

export default router;
