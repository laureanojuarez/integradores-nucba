import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/users.js";
import hash from "../middlewares/hash.js";
const router = express.Router();
router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", hash, createUser);
router.put("/:id", hash, updateUser);
router.delete("/:id", deleteUser);

export default router;
