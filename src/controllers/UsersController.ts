import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UsersModel";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { generateStyledOTPEmail } from "../utils/generateOTPEmailTemplate";

export const signUp = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).lean(); // Convert Mongoose document to plain JS object
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || "",
      {
        expiresIn: "7d",
      }
    );

    // Remove password before sending the response
    const { password: _, ...userWithoutPassword } = user;

    res.json({ token, user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const sendVerificationOTP = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const otp = crypto.randomInt(100000, 999999).toString(); // Generate 6-digit OTP
    user.verificationOTP = otp;
    user.verificationExpires = new Date(Date.now() + 300000); // 5 minutes
    await user.save();

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "mdmehedihasan18111@gmail.com",
        pass: "ttjy oszp ctbj nzup",
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification OTP",
      html: generateStyledOTPEmail(otp),
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const verifyEmailOTP = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.verificationOTP !== otp) {
      res.status(400).json({ message: "Invalid OTP or email" });
      return;
    }

    if (user.verificationExpires && new Date() > user.verificationExpires) {
      res.status(400).json({ message: "OTP expired" });
      return;
    }

    user.isVerified = true;
    user.verificationOTP = null; // Clear OTP
    user.verificationExpires = null;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const sendForgotPasswordOTP = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const otp = crypto.randomInt(100000, 999999).toString(); // Generate 6-digit OTP
    user.passwordResetOTP = otp;
    user.passwordResetExpires = new Date(Date.now() + 300000); // 5 minutes
    await user.save();

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "mdmehedihasan18111@gmail.com",
        pass: "ttjy oszp ctbj nzup",
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      html: generateStyledOTPEmail(otp),
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const resetPasswordWithOTP = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.passwordResetOTP !== otp) {
      res.status(400).json({ message: "Invalid OTP or email" });
      return;
    }

    if (user.passwordResetExpires && new Date() > user.passwordResetExpires) {
      res.status(400).json({ message: "OTP expired" });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.passwordResetOTP = null; // Clear OTP
    user.passwordResetExpires = null;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const uploadProfilePicture = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, imageUrl } = req.body;

    // Validate input
    if (!email || !imageUrl) {
      res.status(400).json({ message: "Email and imageUrl are required" });
      return;
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Update the user's profile picture
    user.profilePicture = imageUrl;
    await user.save();

    res.status(200).json({
      message: "Profile picture updated successfully",
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { search } = req.query;

    const query: any = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const users = await User.find(query, "-password"); // Exclude password field
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export const getUserDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await User.findById(id, "-password"); // Exclude password field
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export const editUserName = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ success: false, message: "Name is required" });
      return;
    }

    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    user.name = name;
    await user.save();

    res.status(200).json({ success: true, message: "User name updated", user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
