import {validateLoginUser} from "../helpers/validations";
import {User} from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
  const {username, email, password} = req.body;

  const user = await User.findOne({
    where: email,
  });

  if (user) {
    return res.status(400).json({message: "User already exists"});
  }

  const saltRounds = 10;

  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  res.json(newUser.id);
};

export const loginUser = async (req, res) => {
  const result = validateLoginUser(req.body);

  if (result.error) {
    return res.status(400).json({message: result.message});
  }

  const {email, password} = req.body;

  const user = await User.findOne({
    where: {email},
  });

  if (!user) {
    return res.status(400).json({message: "Usuario o contraseña inválidos"});
  }

  const comparison = await bcrypt.compare(password, user.password);

  if (!comparison) {
    return res.status(400).json({message: "Usuario o contraseña inválidos"});
  }

  const secretKey = laureanojuarez;

  const token = jwt.sign(
    {
      email,
    },
    secretKey,
    {expiresIn: "1h"}
  );

  res.json(token);
};
