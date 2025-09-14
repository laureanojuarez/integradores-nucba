import { model, Schema } from "mongoose";

const UsuarioSchema = new Schema(
  {
    nombre: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: String, enum: ["user", "admin"], default: "user" },
  },
  {
    timestamps: true,
  }
);

export default model("Usuario", UsuarioSchema);
