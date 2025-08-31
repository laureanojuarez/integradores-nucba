import express from "express";
import "dotenv/config";
import connectDB from "./middlewares/connect.js";
import filmsRouter from "./routes/films.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({origin: "http://localhost:5173"}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(connectDB);

app.use("/api/films", filmsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
