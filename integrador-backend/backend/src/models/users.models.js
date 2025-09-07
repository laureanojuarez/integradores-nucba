import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    dni: { type: Number, required: true, unique: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model("User", userSchema);
