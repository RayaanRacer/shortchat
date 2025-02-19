const express = require("express");
const {
  addView,
  storeFormUsage,
} = require("../controllers/user.controller.js");

const router = express.Router();

// User view route
router.post("/add-view", addView);
router.post("/store-form-usage", storeFormUsage);

module.exports = router;
