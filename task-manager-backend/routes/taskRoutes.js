// @ Libs
import express from "express";
const router = express.Router();

// @ Services
import {
  createTask,
  getTasks,
  editTask,
  deleteTask,
} from "../controllers/taskController.js";

// @ Middleware
import { protect } from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";

// @ Utils
import taskSchema from "../validation/taskValidation.js";

router.post("/", protect, validate(taskSchema), createTask);
router.get("/", protect, getTasks);
router.put("/:id", protect, validate(taskSchema), editTask);
router.delete("/:id", protect, deleteTask);

export default router;
