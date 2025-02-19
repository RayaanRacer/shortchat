import express from "express";
import { adminLogin, registerAdmin } from "../controllers/admin.controller.js";

const router = express.Router();

// Admin login route
router.post("/login", adminLogin);

// Admin registration route (Use only once to create an admin)
router.post("/register", registerAdmin);

export default router;
