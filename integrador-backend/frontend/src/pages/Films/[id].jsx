import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../../components/UI/Button";
import { Seats } from "../../components/Seats/Seats";
import { fetchAvailability, reserveSeats } from "../../api/seats";
import { fetchFilmById } from "../../api/films";
import { useSelector } from "react-redux";
import { CartTab } from "../../components/CartTab/CartTab";

const dayNames = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

const groupShowtimes = (dates = []) => {
  const map = {};
  for (const iso of dates) {
    const d = new Date(iso);
    const day = dayNames[d.getDay()];
    const time = d.toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    map[day] ||= [];
    if (!map[day].includes(time)) map[day].push(time);
  }
  return map;
};

export default function FilmDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [salas, setSalas] = useState([]);
  const [selectedSala, setSelectedSala] = useState(null);

  const [activeDay, setActiveDay] = useState(null);
  const [activeTime, setActiveTime] = useState(null);
  const [unavailable, setUnavailable] = useState([]);
  const [selected, setSelected] = useState([]);

  const { user, token } = useSelector((s) => s.auth);
  const isAuthenticated = Boolean(token);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    fetchFilmById(id)
      .then((data) => {
        setFilm({
          id: data._id ?? data.id,
          title: data.titulo,
          type: data.genero,
          duration: data.duracion ? `${data.duracion} min` : null,
          poster: data.poster || null,
          horarios: data.horarios || [],
        });
        setLoading(false);
      })
      .catch((e) => {
        setLoadError(e.message || "Error al cargar");
        setLoading(false);
      });
  }, [id]);

  // Cargar salas
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/salas`
    )
      .then((r) => r.json())
      .then((data) => {
        setSalas(data);
        if (data.length > 0) setSelectedSala(data[0]._id);
      })
      .catch(() => setSalas([]));
  }, []);

  // Agrupar horarios por día
  const showtimes = useMemo(() => groupShowtimes(film?.horarios || []), [film]);

  // Buscar fecha ISO del horario seleccionado
  const horarioDate = useMemo(() => {
    if (!activeDay || !activeTime || !film?.horarios) return null;
    return (
      film.horarios.find((iso) => {
        const d = new Date(iso);
        const day = dayNames[d.getDay()];
        const time = d.toLocaleTimeString("es-AR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        return day === activeDay && time === activeTime;
      }) || null
    );
  }, [activeDay, activeTime, film]);

  useEffect(() => {
    setSelected([]);
    if (!selectedSala || !horarioDate || !film?.id) {
      setUnavailable([]);
      return;
    }
    fetchAvailability({
      peliculaId: film.id,
      salaId: selectedSala,
      horario: horarioDate,
    })
      .then((data) => setUnavailable(data || []))
      .catch(() => setUnavailable([]));
  }, [film?.id, horarioDate, selectedSala]);

  const toggleSeat = (fila, columna) => {
    setSelected((prev) => {
      const exists = prev.some((s) => s.fila === fila && s.columna === columna);
      if (exists)
        return prev.filter((s) => !(s.fila === fila && s.columna === columna));
      return [...prev, { fila, columna }];
    });
  };

  const handlePurchase = () => {
    if (!horarioDate || selected.length === 0 || !selectedSala) return;
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    setShowCart(true);
  };

  const handleConfirmPurchase = async () => {
    try {
      const payloads = selected.map((asiento) => ({
        peliculaId: film.id,
        salaId: selectedSala,
        horario: horarioDate,
        fila: Number(asiento.fila),
        columna: Number(asiento.columna),
      }));

      console.log("Reserva -> payloads", payloads);

      await Promise.all(payloads.map((p) => reserveSeats(p)));

      // Actualizar el estado local inmediatamente
      setUnavailable((prev) => [
        ...prev,
        ...selected.map((seat) => ({
          fila: Number(seat.fila),
          columna: Number(seat.columna),
          estado: "pendiente",
        })),
      ]);

      // Refrescar datos del servidor
      if (film?.id && horarioDate && selectedSala) {
        try {
          const updatedData = await fetchAvailability({
            peliculaId: film.id,
            salaId: selectedSala,
            horario: horarioDate,
          });
          setUnavailable(updatedData || []);
        } catch (error) {
          console.error("Error actualizando disponibilidad:", error);
        }
      }

      setSelected([]); // Limpiar selección
      setShowCart(false);

      navigate("/checkout", {
        state: {
          film: film.title,
          day: activeDay,
          time: activeTime,
          seats: selected,
        },
      });
    } catch (e) {
      console.error("Reserva error:", e);
      alert(e.message || "No se pudo reservar. Intenta nuevamente.");
    }
  };

  if (loading) return <p className="mt-10 text-neutral-400">Cargando...</p>;
  if (loadError) return <p className="mt-10 text-red-400">{loadError}</p>;
  if (!film)
    return <p className="mt-10 text-neutral-400">Película no encontrada.</p>;

  const days = Object.keys(showtimes);
  const times = activeDay ? showtimes[activeDay] || [] : [];
  const isReadyToPurchase =
    activeDay && activeTime && selected.length > 0 && Boolean(selectedSala);

  return (
    <div className="mt-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{film.title}</h1>
        <div className="flex flex-wrap gap-3 text-sm text-neutral-300">
          <span className="rounded bg-neutral-700/40 px-2 py-1">
            {film.type}
          </span>
          {film.duration && <span>{film.duration}</span>}
        </div>
      </header>

      <div className="overflow-hidden rounded-xl ring-1 ring-neutral-700/50 flex justify-between">
        {film.poster ? (
          <img
            src={film.poster}
            alt={film.title}
            className="w-96 object-cover"
          />
        ) : (
          <div className="w-96 h-64 flex items-center justify-center bg-neutral-700/40">
            <span className="text-4xl font-bold text-neutral-300">
              {film.title?.[0]?.toUpperCase() || "?"}
            </span>
          </div>
        )}

        <div className="w-full items-center flex flex-col">
          <h1 className="text-lg font-semibold text-start w-full">HORARIOS</h1>
          <section>
            {salas.length > 0 && (
              <>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
                  Sala
                </h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {salas.map((sala) => (
                    <li key={sala._id}>
                      <Chip
                        active={selectedSala === sala._id}
                        onClick={() => {
                          setSelectedSala(sala._id);
                          setSelected([]);
                          setUnavailable([]);
                        }}
                      >
                        {sala.nombre}
                      </Chip>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <h2 className="mt-4 text-sm font-semibold uppercase tracking-wide text-neutral-400">
              Días
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {days.map((day) => (
                <li key={day}>
                  <Chip
                    active={activeDay === day}
                    onClick={() => {
                      setActiveDay(day);
                      setActiveTime(null);
                      setSelected([]);
                      setUnavailable([]);
                    }}
                  >
                    {day}
                  </Chip>
                </li>
              ))}
            </ul>

            {activeDay && (
              <>
                <h2 className="mt-4 text-sm font-semibold uppercase tracking-wide text-neutral-400">
                  Horarios
                </h2>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {times.map((time) => (
                    <li key={time}>
                      <Chip
                        active={activeTime === time}
                        onClick={() => {
                          setActiveTime(time);
                          setSelected([]);
                        }}
                      >
                        {time}
                      </Chip>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {activeDay && activeTime && selectedSala && (
              <div className="mt-4">
                <h3 className="mb-2 text-sm font-semibold text-neutral-300">
                  Mapa de sala
                </h3>
                <Seats
                  unavailable={unavailable}
                  selected={selected}
                  onToggle={toggleSeat}
                  rows={salas.find((s) => s._id === selectedSala)?.filas || 6}
                  leftCols={Math.floor(
                    (salas.find((s) => s._id === selectedSala)?.columnas || 8) /
                      2
                  )}
                  rightCols={Math.ceil(
                    (salas.find((s) => s._id === selectedSala)?.columnas || 8) /
                      2
                  )}
                />
              </div>
            )}

            <div className="flex w-full items-center justify-center mt-4">
              <Button
                bg={isReadyToPurchase ? "bg-red-500" : "bg-gray-500/50"}
                hv={isReadyToPurchase ? "bg-red-600" : "bg-gray-500/50"}
                onClick={handlePurchase}
                disabled={!isReadyToPurchase}
              >
                {!isAuthenticated
                  ? "INICIAR SESIÓN PARA COMPRAR"
                  : !selectedSala
                  ? "SELECCIONA UNA SALA"
                  : "IR A CONFIRMAR COMPRA"}
              </Button>
            </div>
          </section>
        </div>
      </div>

      {showCart && (
        <CartTab
          filmTitle={film.title}
          day={activeDay}
          time={activeTime}
          seats={selected}
          onClose={() => setShowCart(false)}
          onConfirm={handleConfirmPurchase}
        />
      )}
    </div>
  );
}

function Chip({ active, onClick, children }) {
  const base =
    "rounded px-6 py-2 text-xs cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-neutral-500";
  const state = active
    ? "bg-neutral-100/30 text-black font-bold"
    : "bg-neutral-700/30 text-neutral-200 hover:bg-neutral-600/40";
  return (
    <button type="button" className={`${base} ${state}`} onClick={onClick}>
      {children}
    </button>
  );
}
