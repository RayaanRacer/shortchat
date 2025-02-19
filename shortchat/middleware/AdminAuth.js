const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY; // Store this securely in environment variables

const AdminAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

    if (!token) {
      return res
        .status(403)
        .json({ message: "Access denied. No token provided." });
    }

    // Verify token
    const decoded = jwt.verify(token, SECRET_KEY);

    // Attach admin ID to request for further processing
    req.adminId = decoded.id;

    next(); // Proceed to the next middleware or route
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = AdminAuth;
