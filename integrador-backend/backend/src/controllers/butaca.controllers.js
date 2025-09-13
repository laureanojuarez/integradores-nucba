import Butaca from "../models/butaca.models.js";

export const getButacas = async (_req, res) => {
  try {
    const butacas = await Butaca.find().lean();
    res.json(butacas);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export const getAvailability = async (req, res) => {
  try {
    const {peliculaId, salaId, horario} = req.query;
    if (!peliculaId || !salaId || !horario)
      return res.status(400).json({message: "Faltan parámetros"});

    const date = new Date(horario);
    const taken = await Butaca.find({
      peliculaId,
      salaId,
      horario: date,
      estado: {$in: ["pendiente", "ocupada"]},
    }).select("fila columna -_id");

    res.json({taken});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export const reserveSeats = async (req, res) => {
  try {
    const {peliculaId, salaId, horario, asientos} = req.body;
    if (
      !peliculaId ||
      !salaId ||
      !horario ||
      !Array.isArray(asientos) ||
      !asientos.length
    )
      return res.status(400).json({message: "Datos inválidos"});

    const date = new Date(horario);

    const conflicts = await Butaca.find({
      peliculaId,
      salaId,
      horario: date,
      $or: asientos.map((a) => ({fila: a.fila, columna: a.columna})),
      estado: {$in: ["pendiente", "ocupada"]},
    }).select("fila columna -_id");

    if (conflicts.length)
      return res.status(409).json({message: "Butacas ya tomadas", conflicts});

    const docs = asientos.map((a) => ({
      peliculaId,
      salaId,
      horario: date,
      fila: a.fila,
      columna: a.columna,
      usuarioId: req.user?.id || null,
      estado: "ocupada",
    }));

    const created = await Butaca.insertMany(docs);
    res.status(201).json({ok: true, created});
  } catch (error) {
    if (error?.code === 11000)
      return res.status(409).json({message: "Butacas ya tomadas"});
    res.status(500).json({message: error.message});
  }
};

export const updateButaca = async (req, res) => {
  try {
    const updated = await Butaca.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export const deleteButaca = async (req, res) => {
  try {
    await Butaca.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};
