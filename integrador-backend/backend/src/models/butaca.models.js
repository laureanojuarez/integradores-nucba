import mongoose from "mongoose";

const ButacaSchema = new mongoose.Schema({
  peliculaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pelicula",
    required: true,
  },
  salaId: {type: mongoose.Schema.Types.ObjectId, ref: "Sala", required: true},
  horario: {type: Date, required: true},
  fila: {type: Number, required: true},
  columna: {type: Number, required: true},
  usuarioId: {type: mongoose.Schema.Types.ObjectId, ref: "Usuario"},
  estado: {
    type: String,
    enum: ["pendiente", "ocupada", "cancelada"],
    default: "pendiente",
  },
});

ButacaSchema.index(
  {peliculaId: 1, salaId: 1, horario: 1, fila: 1, columna: 1},
  {unique: true}
);

export default mongoose.model("Butaca", ButacaSchema);
