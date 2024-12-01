import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Connect to MongoDB
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Print the name of the database you're connected to
    console.log(`MongoDB connected to database: ${connection.connection.name}`);
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
