import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: `${API}/api/butacas`,
  withCredentials: true,
});

const toISO = (horario) =>
  horario instanceof Date
    ? horario.toISOString()
    : new Date(horario).toISOString();

export const fetchAvailability = async ({peliculaId, salaId, horario}) => {
  try {
    const {data} = await api.get("/availability", {
      params: {peliculaId, salaId, horario: toISO(horario)},
    });
    return data; // { taken: [{fila, columna}] }
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Error obteniendo disponibilidad"
    );
  }
};

export const reserveSeats = async ({peliculaId, salaId, horario, asientos}) => {
  try {
    const {data} = await api.post("/reserve", {
      peliculaId,
      salaId,
      horario: toISO(horario),
      asientos,
    });
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Error al reservar");
  }
};
