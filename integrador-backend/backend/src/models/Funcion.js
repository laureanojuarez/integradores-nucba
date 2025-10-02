import { DataTypes } from "sequelize";
import { sequelize } from "../db";
import { Pelicula } from "./Pelicula";
import { Sala } from "./Sala";

export const Funcion = sequelize.define("funcion", {
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Pelicula.hasMany(Funcion);
Funcion.belongsTo(Pelicula);

Sala / hasMany(Funcion);
Funcion.belongsTo(Sala);
