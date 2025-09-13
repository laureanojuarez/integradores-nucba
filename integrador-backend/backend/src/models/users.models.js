import {model, Schema} from "mongoose";

const UsuarioSchema = new Schema(
  {
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, enum: ["user", "admin"], default: "user"},
  },
  {
    timestamps: true,
  }
);

export default model("Usuario", UsuarioSchema);
