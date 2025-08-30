import { Schema, model } from "mongoose";

const FilmSchema = new Schema(
  {
    title: { type: String, required: true },
    technology: {
      type: String,
      required: true,
      enum: ["2D", "3D", "IMAX", "4DX"],
    },
  },
  {
    timestamps: true,
  }
);

export default model("Film", FilmSchema);
