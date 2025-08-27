import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: { type: String, required: true },
  password: String,
  token: String,
  validated: { type: Boolean, default: false },
});

const User = model("User", UserSchema);

export default User;
