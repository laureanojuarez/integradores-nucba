import { createAccessToken } from "../libs/jwt.js";
import User from "../models/users.models.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { dni, email, password, username } = req.body;

    const userFound = await User.findOne({ email });

    if (userFound)
      return res.status(400).json({
        message: ["El email ya esta en uso"],
      });

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      dni,
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();

    const token = await createAccessToken({
      id: userSaved._id,
    });

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      token: token,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

    const token = await createAccessToken({ id: user._id });
    const { password: _, ...safe } = user;

    res.status(200).json({ ...safe, token });
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
