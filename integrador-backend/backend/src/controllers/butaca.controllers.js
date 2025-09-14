import Butaca from "../models/butaca.models.js";

// Obtener estado de butacas para una sala/película/horario
export const getButacas = async (req, res) => {
  try {
    const { peliculaId, salaId, horario } = req.query;
    if (!peliculaId || !salaId || !horario)
      return res.status(400).json({ message: "Faltan parámetros" });

    const date = new Date(horario);
    const butacas = await Butaca.find({
      peliculaId,
      salaId,
      horario: date,
      estado: { $in: ["pendiente", "ocupada"] },
    }).select("fila columna estado usuarioId");

    console.log("Butacas encontradas:", butacas); // Para debug
    res.json(butacas);
  } catch (error) {
    console.error("Error en getButacas:", error);
    res.status(500).json({ message: error.message });
  }
};

// Reservar una butaca (estado pendiente)
export const reservarButaca = async (req, res) => {
  try {
    const { peliculaId, salaId, horario, fila, columna } = req.body;
    const usuarioId = req.user.id; // Obtener del token JWT

    console.log("Datos recibidos:", {
      peliculaId,
      salaId,
      horario,
      fila,
      columna,
      usuarioId,
    });

    if (
      !peliculaId ||
      !salaId ||
      !horario ||
      fila === undefined ||
      columna === undefined
    ) {
      return res.status(400).json({ message: "Faltan datos requeridos" });
    }

    const date = new Date(horario);

    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) {
      return res.status(400).json({ message: "Horario inválido" });
    }

    // Verificar si ya está reservada
    const conflict = await Butaca.findOne({
      peliculaId,
      salaId,
      horario: date,
      fila: Number(fila),
      columna: Number(columna),
      estado: { $in: ["pendiente", "ocupada"] },
    });

    if (conflict) {
      return res.status(409).json({ message: "Butaca ya reservada" });
    }

    const nueva = await Butaca.create({
      peliculaId,
      salaId,
      horario: date,
      fila: Number(fila),
      columna: Number(columna),
      usuarioId,
      estado: "pendiente",
    });

    res.status(201).json(nueva);
  } catch (error) {
    console.error("Error en reservarButaca:", error);
    res.status(500).json({ message: error.message });
  }
};
// Confirmar compra (estado ocupada)
export const confirmarReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const butaca = await Butaca.findByIdAndUpdate(
      id,
      { estado: "ocupada" },
      { new: true }
    );
    if (!butaca)
      return res.status(404).json({ message: "Reserva no encontrada" });
    res.json(butaca);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancelar reserva (liberar butaca)
export const cancelarReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const butaca = await Butaca.findByIdAndUpdate(
      id,
      { estado: "cancelada" },
      { new: true }
    );
    if (!butaca)
      return res.status(404).json({ message: "Reserva no encontrada" });
    res.json(butaca);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
