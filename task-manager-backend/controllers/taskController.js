import { ERole } from "../enums/user.js";
import Task from "../models/Task.js";

// Create a task
const createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = await Task.create({
      title,
      description,
      user: req.user._id,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get tasks with pagination
const getTasks = async (req, res) => {
  const { status, search, sort } = req.query;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const sortQuery = {};
  if (sort) {
    const parts = sort.split("|");
    if (parts.length === 2) {
      const field = parts[0];
      const order = parts[1].toLowerCase();
      if (field === "createdAt" && (order === "asc" || order === "desc")) {
        sortQuery[field] = order === "asc" ? -1 : 1;
      }
    }
  }
  try {
    const query = {};
    if (req.user.role === ERole.USER) {
      query.user = req.user._id;
    }
    if (status) {
      query.status = status;
    }
    if (search) {
      const regex = new RegExp(search, "i");
      query.$or = [
        { title: { $regex: regex } },
        { description: { $regex: regex } },
      ];
    }

    const tasks = await Task.find(query)
      .skip(skip)
      .limit(limit)
      .sort(sortQuery);

    const totalTasks = await Task.countDocuments(query);

    // Calculate total pages based on total tasks and limit
    const totalPages = Math.ceil(totalTasks / limit);

    res.json({
      tasks,
      pagination: {
        total: totalTasks,
        totalPages,
        currentPage: page,
        pageSize: limit,
      },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Edit a task
const editTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to edit this task" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this task" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export { createTask, getTasks, editTask, deleteTask };
