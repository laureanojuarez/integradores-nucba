import User from "../models/users.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  try {
    const { dni, password } = req.body;
    if (!dni || !password) {
      return res.status(400).json({ message: "DNI y password requeridos" });
    }
    const user = await User.findOne({ dni }).lean();
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const ok = await bcrypt.compare(password, user.password || "");
    if (!ok) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    const { password: _, ...safe } = user;
    res.status(200).json(safe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const profile = async (req, res) => {
  try {
    const { id } = req.params; // id de Mongo
    const user = await User.findById(id).lean();
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    const { password, ...safe } = user;
    res.status(200).json(safe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
