import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const SECRET_KEY = process.env.SECRET_KEY; // Change this to a secure key

// Admin Login Controller
export const adminLogin = asyncHandler(async (req, res) => {
  try {
    const { password } = req.body;

    // Fetch admin from the database
    const admin = await Admin.findOne();

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin.id }, SECRET_KEY, { expiresIn: "1d" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Admin Registration (Only for first-time setup)
export const registerAdmin = asyncHandler(async (req, res) => {
  try {
    const { password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Admin user
    const admin = await Admin.create({ password: hashedPassword });

    res.status(201).json({ message: "Admin registered successfully", admin });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
