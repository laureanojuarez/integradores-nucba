import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
    next();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export default connectDB;
