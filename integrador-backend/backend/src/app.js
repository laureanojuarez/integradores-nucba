import express from "express";
import "dotenv/config.js";
import authRoutes from "./routes/auth.routes.js";
import butacaRoutes from "./routes/butaca.routes.js";
import filmsRoutes from "./routes/films.routes.js";
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
app.use("/api/butacas", butacaRoutes);
app.use("/api/films", filmsRoutes);

export default app;
