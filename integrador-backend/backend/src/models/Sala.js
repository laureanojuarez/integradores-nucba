import { DataTypes } from "sequelize";
import { sequelize } from "../db";

export const Sala = sequelize.define("sala", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  capacidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
