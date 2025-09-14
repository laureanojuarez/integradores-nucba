import mongoose from "mongoose";

const ButacaSchema = new mongoose.Schema({
  peliculaId: { type: String, required: true },
  salaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sala",
    required: true,
  },
  horario: { type: Date, required: true },
  fila: { type: Number, required: true },
  columna: {
    type: Number,
    required: true,
  },
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  estado: {
    type: String,
    enum: ["pendiente", "ocupada", "cancelada"],
    default: "pendiente",
  },
});

export default mongoose.model("Butaca", ButacaSchema);
