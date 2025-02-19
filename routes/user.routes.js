import express from "express";
import { addView, storeFormUsage } from "../controllers/user.controller.js";

const router = express.Router();

// User view route
router.post("/add-view", addView);
router.post("/store-form-usage", storeFormUsage);

export default router;
