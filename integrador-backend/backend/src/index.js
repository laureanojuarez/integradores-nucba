import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import peliculasRouter from "./routes/peliculas.routes.js";
import authRouter from "./routes/auth.routes.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", peliculasRouter);
app.use("/api/auth", authRouter);
app.get("/health", (req, res) => res.send("OK"));

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
  console.log("Rutas disponibles:");
  console.log("- GET  /api/films");
  console.log("- GET  /api/films/:id");
  console.log("- GET  /api/availability");
  console.log("- GET  /api/salas");
  console.log("- POST /api/seats/reserve");
  console.log("- PUT  /api/seats/confirm/:id");
  console.log("- POST /api/auth/login");
  console.log("- POST /api/auth/register");
});
