import express from "express";
import "dotenv/config.js";
import usuarioRoutes from "./routes/usuario.routes.js";
import butacaRoutes from "./routes/butaca.routes.js";
import filmsRoutes from "./routes/films.routes.js";
import salaRoutes from "./routes/sala.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:5173",
      "https://cine-rosario.vercel.app/",
      "https://cinema-backend-sq1k.onrender.com",
    ],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/usuario", usuarioRoutes);
app.use("/api/butacas", butacaRoutes);
app.use("/api/films", filmsRoutes);
app.use("/api/salas", salaRoutes);

export default app;
