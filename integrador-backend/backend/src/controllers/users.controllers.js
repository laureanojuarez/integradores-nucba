import User from "../models/users.models.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().lean();
    res.json(users.map(({ password, ...u }) => u));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).lean();
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const { password, ...safe } = user;
    res.json(safe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const dni = Number(req.body.dni);
    const { username, email, password } = req.body;

    if (isNaN(dni)) {
      return res.status(400).json({ message: "DNI debe ser un número" });
    }

    const userExists = await User.findOne({ dni });
    if (userExists) {
      return res.status(409).json({ message: "DNI ya registrado" });
    }

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, email y password son requeridos" });
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      return res.status(400).json({ message: "Email no válido" });
    }

    const user = await User.create({
      dni,
      username,
      email,
      password,
    });
    const { password: _, ...safe } = user.toObject();
    res.status(201).json(safe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const { id } = req.params;

    let updateData = { username, email };
    if (password) {
      updateData.password = password;
    }

    const user = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const { password: _, ...safe } = user.toObject();
    res.status(200).json(safe);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.status(204).send();
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
