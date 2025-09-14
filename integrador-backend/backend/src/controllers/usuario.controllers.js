import Usuario from "../models/usuario.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const existe = await Usuario.findOne({ email });
    if (existe) return res.status(400).json({ error: "El usuario ya existe" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = new Usuario({
      nombre,
      email,
      password: hashedPassword,
    });
    await nuevoUsuario.save();

    res.json({ msg: "Usuario registrado con éxito" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (!usuario)
      return res.status(400).json({ error: "Usuario no encontrado" });

    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido)
      return res.status(400).json({ error: "Credenciales inválidas" });

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      usuario: { id: usuario._id, nombre: usuario.nombre, rol: usuario.rol },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const profile = async (req, res) => {
  res.json({ user: req.user });
};
