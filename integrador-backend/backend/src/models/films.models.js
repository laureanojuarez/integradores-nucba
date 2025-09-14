import mongoose, { Schema } from "mongoose";

const PeliculaSchema = new Schema({
  titulo: { type: String, required: true },
  duracion: { type: Number, required: true },
  genero: { type: String, required: true },
  poster: { type: String },
  horarios: [Date],
});

export default mongoose.model("Pelicula", PeliculaSchema);
