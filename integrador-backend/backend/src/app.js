import express from "express";
import "dotenv/config.js";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";
import {FRONTEND_URL} from "./config.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/auth", authRoutes);

export default app;
