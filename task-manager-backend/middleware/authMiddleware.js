import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ERole } from "../enums/user.js";

const protect = async (req, res, next) => {
  let token;

  // Check for token in header (Authorization: Bearer <token>)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Decode the token to get the user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID
      req.user = await User.findById(decoded.id);

      // Proceed to next middleware or route handler
      next();
    } catch (error) {
      console.error("Authorization error:", error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Admin role check middleware
const admin = (req, res, next) => {
  if (req.user && req.user.role === ERole.ADMIN) {
    next(); // Proceed to the next middleware or route handler
  } else {
    res.status(403).json({ message: "Admin privileges required" });
  }
};

export { protect, admin };
