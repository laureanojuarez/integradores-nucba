import Film from "../models/films";

export const getFilms = async (req, res) => {
  try {
    const films = await Film.find();
    res.status(200).json(films);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createFilm = async (req, res) => {
  try {
    const newFilm = new Film(req.body);
    await newFilm.save();
    res.status(201).json(newFilm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
