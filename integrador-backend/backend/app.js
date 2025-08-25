import express from "express";
import "dotenv/config";
import connectDB from "./middlewares/connect";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(connectDB);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
