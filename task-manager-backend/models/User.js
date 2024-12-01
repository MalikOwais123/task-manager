import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { ERole } from "../enums/user.js";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [ERole.ADMIN, ERole.USER],
    default: ERole.USER,
  },
});

// Pre-save hook to hash the password before saving it
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// Method to compare password during login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
