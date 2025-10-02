import { sequelize } from "../db";
import { DataTypes } from "sequelize";

const User = sequelize.define("user", {
  username: {
    type: DataTypes.STRING,
  },
});
