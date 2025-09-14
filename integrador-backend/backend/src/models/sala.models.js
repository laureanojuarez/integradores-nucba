import mongoose, { Schema } from "mongoose";

const SalaSchema = new Schema({
  nombre: { type: String, required: true },
  filas: { type: Number, required: true },
  columnas: { type: Number, required: true },
});

export default mongoose.model("Sala", SalaSchema);
