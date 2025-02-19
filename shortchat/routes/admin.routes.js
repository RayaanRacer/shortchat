const express = require("express");
const {
  adminLogin,
  registerAdmin,
} = require("../controllers/admin.controller.js");

const router = express.Router();

// Admin login route
router.post("/login", adminLogin);

// Admin registration route (Use only once to create an admin)
router.post("/register", registerAdmin);

module.exports = router;
