import { sequelize } from "../db";
import { DataTypes } from "sequelize";
import { User } from "./User";
import { Funcion } from "./Funcion";

export const Entrada = sequelize.define("entrada", {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  asiento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

User.hasMany(Entrada);
Entrada.belongsTo(User);

Funcion.hasMany(Entrada);
Entrada.belongsTo(Funcion);
