import axios from "axios";

const API =
  import.meta.env.VITE_API_URL || "https://cinema-backend-sq1k.onrender.com";

const api = axios.create({
  baseURL: `${API}/api/butacas`,
  withCredentials: true,
});

const toISO = (horario) =>
  horario instanceof Date
    ? horario.toISOString()
    : new Date(horario).toISOString();

export const fetchAvailability = async ({ peliculaId, salaId, horario }) => {
  try {
    const { data } = await api.get("/availability", {
      params: { peliculaId, salaId, horario: toISO(horario) },
    });
    console.log("Butacas ocupadas recibidas:", data); // Para debug
    return data;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Error obteniendo disponibilidad"
    );
  }
};

export async function reserveSeats({
  peliculaId,
  salaId,
  horario,
  fila,
  columna,
}) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const { data } = await api.post(
      "/reservar",
      {
        peliculaId,
        salaId,
        horario: toISO(horario),
        fila: Number(fila),
        columna: Number(columna),
        // No enviar usuarioId, se obtiene del token en el backend
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (err) {
    console.error("Error en reserveSeats:", err);
    const serverMsg = err.response?.data?.error ?? err.response?.data?.message;
    const message = Array.isArray(serverMsg) ? serverMsg[0] : serverMsg;
    throw new Error(message || "Error al reservar asientos");
  }
}

export async function confirmSeat(id) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No hay token de autenticación");

    const { data } = await api.post(
      `/confirmar/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (err) {
    const serverMsg = err.response?.data?.error ?? err.response?.data?.message;
    const message = Array.isArray(serverMsg) ? serverMsg[0] : serverMsg;
    throw new Error(message || "Error al confirmar reserva");
  }
}
