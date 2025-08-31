import bcrypt from "bcryptjs";

const hash = (req, res, next) => {
  try {
    const { password } = req.body;
    if (password) {
      const hashPassword = bcrypt.hashSync(password, 10);
      req.body.password = hashPassword;
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default hash;
