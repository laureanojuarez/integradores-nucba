import {Router} from "express";

const router = Router();

router.get("/films", (req, res) => {
  res.send("List of films");
});

router.get("/books/:id", (req, res) => {
  const {id} = req.params;
  res.send(`Details of book with ID: ${id}`);
});

export default router;
