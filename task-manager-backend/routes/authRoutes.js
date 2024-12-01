// @ Libs
import express from "express";
const router = express.Router();

// @ Services
import { registerUser, loginUser } from "../controllers/authController.js";

// @ Middleware
import { protect, admin } from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";

// @ Utils
import {
  userSignupSchema,
  userLoginSchema,
} from "../validation/userValidation.js";

router.get("/admin-dashboard", protect, admin, (req, res) => {
  res.json({ message: "Welcome to the admin dashboard!" });
});
router.post("/signup", validate(userSignupSchema), registerUser);
router.post("/login", validate(userLoginSchema), loginUser);

export default router;
