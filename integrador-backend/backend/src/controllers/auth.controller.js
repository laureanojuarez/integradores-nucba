import pool from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

// Registrar usuario
export const registrarUsuario = async (req, res) => {
  try {
    console.log("Registro recibido:", req.body); // DEBUG

    const { nombre, email, password } = req.body;

    // Validaciones básicas
    if (!nombre || !email || !password) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "La contraseña debe tener al menos 6 caracteres" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Email inválido" });
    }

    // Verificar si el usuario ya existe
    const [existeUsuario] = await pool.query(
      "SELECT id FROM usuarios WHERE email = ?",
      [email]
    );

    if (existeUsuario.length > 0) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar usuario
    const [resultado] = await pool.query(
      "INSERT INTO usuarios (usuario, email, password_hash) VALUES (?, ?, ?)",
      [nombre, email, hashedPassword]
    );

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      userId: resultado.insertId,
    });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Login usuario
export const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const [usuarios] = await pool.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    if (usuarios.length === 0) {
      return res.status(400).json({ error: "Email o contraseña incorrectos" });
    }

    const usuarioData = usuarios[0];

    // Verificar contraseña - CAMBIAR: usar 'password_hash'
    const passwordValida = await bcrypt.compare(
      password,
      usuarioData.password_hash
    );

    if (!passwordValida) {
      return res.status(400).json({ error: "Email o contraseña incorrectos" });
    }

    // Crear token
    const token = jwt.sign(
      { id: usuarioData.id, email: usuarioData.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: usuarioData.id,
        nombre: usuarioData.usuario, // CAMBIAR: la columna se llama 'usuario'
        email: usuarioData.email,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
