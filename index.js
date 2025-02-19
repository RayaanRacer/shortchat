// Import necessary modules
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import User from "./models/user.model.js";
import Views from "./models/views.model.js";
import Employee from "./models/employee.model.js";
import adminRouter from "./routes/admin.routes.js";
import userRouter from "./routes/user.routes.js";

// Load environment variables from .env file
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Create an instance of express
const app = express();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middlewares
app.use(helmet()); // Secures Express apps by setting HTTP headers
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(morgan("combined")); // Logs requests (combined is the format for detailed logs)
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded payloads

// Sample Route
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.use("/admin", adminRouter);
app.use("/user", userRouter);

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
