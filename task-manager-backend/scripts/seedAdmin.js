import dotenv from "dotenv";
import User from "../models/User.js";
import connectDB from "../config/db.js"; // Assuming you have a db.js file for DB connection
import { ERole } from "../enums/user.js";

dotenv.config();

const seedAdmin = async () => {
  await connectDB();

  try {
    // Check if admin user already exists
    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists) {
      console.log("Admin user already exists.");
      return;
    }

    // If no admin user exists, create one
    const adminUser = new User({
      email: "admin@example.com", // Admin email
      password: "admin123", // Default password, make sure to hash this
      role: ERole.ADMIN,
    });

    // Save the admin user
    await adminUser.save();

    console.log("Admin user created successfully!");
    process.exit(); // Exit after script is done
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1); // Exit with error code if something goes wrong
  }
};

seedAdmin();
