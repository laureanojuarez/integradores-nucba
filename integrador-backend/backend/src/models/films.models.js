import mongoose from "mongoose";

const peliculaSchema = new mongoose.Schema(
  {
    // Mantener compatibilidad con sistema anterior
    titulo: {
      type: String,
      required: true,
    },
    duracion: {
      type: Number,
    },
    genero: {
      type: String,
    },
    poster: {
      type: String,
    },
    horarios: [
      {
        type: Date,
      },
    ],
    tmdbId: {
      type: Number,
      unique: true,
      sparse: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Pelicula", peliculaSchema);
