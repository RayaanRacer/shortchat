// Import necessary modules
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import basicAuth from "basic-auth";
// import mongoose from "mongoose";
// import router from "./routes/index.js";
// import swaggerUi from "swagger-ui-express";
// import { swaggerOptions } from "./swaggerOptions.js";
// import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";
import User from "./models/user.model.js";

// Load environment variables from .env file
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Create an instance of express
const app = express();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = await User.create({ name, email });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});
console.log(
  process.env.DB_NAME,
  process.env.DB_HOST,
  process.env.DB_PORT || 3306
);

// Middlewares
app.use(helmet()); // Secures Express apps by setting HTTP headers
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(morgan("combined")); // Logs requests (combined is the format for detailed logs)
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded payloads

// MongoDB Connection
// const mongoURI = process.env.MONGO_URI;
// mongoose
//   .connect(mongoURI)
//   .then(() => console.log("MongoDB connected successfully"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// Sample Route
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// Route Handlers
// router(app);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

// Catch-all route for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
