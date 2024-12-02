import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

const createApp = (connectToDB = true) => {
  const app = express();
  connectToDB && connectDB();

  app.use(cors());
  app.use(express.json());

  app.get("/api/ping", (_, res) => {
    res.json({ message: "Pong" });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/tasks", taskRoutes);

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  return app;
};

export default createApp;
