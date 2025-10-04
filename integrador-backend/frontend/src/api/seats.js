import api from "./axios.js";

export const reserveSeats = async (seatData) => {
  try {
    console.log("Reservando asiento:", seatData);

    const response = await api.post("/api/seats/reserve", seatData);

    console.log("Respuesta de reserva:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error en reserveSeats:", error);

    // Manejar diferentes tipos de errores
    if (error.response) {
      // Error del servidor (4xx, 5xx)
      const errorMessage =
        error.response.data?.error || "Error al reservar asiento";
      throw new Error(errorMessage);
    } else if (error.request) {
      // Error de red
      throw new Error("Error de conexión. Verifica tu conexión a internet.");
    } else {
      // Otro tipo de error
      throw new Error("Error inesperado al reservar asiento");
    }
  }
};

export const confirmSeat = async (seatId) => {
  try {
    console.log("Confirmando asiento ID:", seatId);

    const response = await api.put(`/api/seats/confirm/${seatId}`);

    console.log("Respuesta de confirmación:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error en confirmSeat:", error);

    if (error.response) {
      const errorMessage =
        error.response.data?.error || "Error al confirmar reserva";
      throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error("Error de conexión. Verifica tu conexión a internet.");
    } else {
      throw new Error("Error inesperado al confirmar reserva");
    }
  }
};

export const fetchAvailability = async ({ peliculaId, salaId, horario }) => {
  try {
    console.log("Obteniendo disponibilidad:", { peliculaId, salaId, horario });

    const response = await api.get("/api/availability", {
      params: {
        peliculaId,
        salaId,
        horario,
      },
    });

    console.log("Disponibilidad obtenida:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error en fetchAvailability:", error);

    if (error.response) {
      const errorMessage =
        error.response.data?.error || "Error al obtener disponibilidad";
      throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error("Error de conexión. Verifica tu conexión a internet.");
    } else {
      throw new Error("Error inesperado al obtener disponibilidad");
    }
  }
};
