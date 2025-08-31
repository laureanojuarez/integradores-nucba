import mongoose from "mongoose";
import "dotenv/config";

let isConnecting = false;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("MongoDB ya conectado");
    return;
  }
  if (isConnecting) return;
  try {
    isConnecting = true;
    console.log("Intentando conectar a:", process.env.MONGO_URL);
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    throw error;
  } finally {
    isConnecting = false;
  }
};

export default connectDB;
