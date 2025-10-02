import express from "express";
import {sequelize} from "./db.js";
import "./models/User.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

try {
  await sequelize.sync();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
