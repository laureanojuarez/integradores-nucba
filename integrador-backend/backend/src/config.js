import "dotenv/config.js";

export const PORT = process.env.PORT || 3000;
export const MONGO_URL = process.env.MONGO_URL;
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
