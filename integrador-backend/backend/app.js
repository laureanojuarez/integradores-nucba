import express from "express";
import "dotenv/config";
import connectDB from "./middlewares/connect.js";
import filmsRouter from "./routes/films.js";
import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API funcionando");
});

app.get("/test", (req, res) => {
  res.json({ message: "API funcionando correctamente" });
});

console.log("Configurando rutas...");

// Usa try/catch para cada ruta separadamente
app.use("/api/films", filmsRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

// Inicia el servidor sin depender de MongoDB primero
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  // Intenta conectar a MongoDB después
  connectDB()
    .then(() => console.log("MongoDB conectado después de iniciar servidor"))
    .catch((err) => console.error("Error conectando a MongoDB:", err));
});
