import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDb Connected");
    next();
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    res.status(500).json({ message: "Error connecting to MongoDB" });
  }
};

export default connectDB;
