import express from "express";
import "dotenv/config.js";
import usersRouter from "./routes/users.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";
import { FRONTEND_URL } from "./config.js";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRouter);

export default app;
