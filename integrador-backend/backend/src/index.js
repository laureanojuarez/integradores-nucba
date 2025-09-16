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
});
