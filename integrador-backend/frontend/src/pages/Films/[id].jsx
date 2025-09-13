import {useNavigate, useParams} from "react-router-dom";
import {films} from "../../mock/films";
import {useEffect, useMemo, useState} from "react";
import {Button} from "../../components/UI/Button";
import {useAuth} from "../../context/AuthProvider";
import {Seats} from "../../components/Seats/Seats";
import {fetchAvailability, reserveSeats} from "../../api/seats";

export default function FilmDetail() {
  const {slug} = useParams();
  const navigate = useNavigate();
  const {isAuthenticated} = useAuth();
  const film = films.find((f) => f.slug === slug);

  if (!film) {
    return (
      <div className="mt-10">
        <p className="text-sm text-neutral-400">Pelicula no encontrada.</p>
      </div>
    );
  }

  const [activeDay, setActiveDay] = useState(null);
  const [activeTime, setActiveTime] = useState(null);
  const [unavailable, setUnavailable] = useState([]);
  const [selected, setSelected] = useState([]);

  const days = Object.keys(film.showtimes);
  const times = activeDay ? film.showtimes[activeDay] : [];
  const isReadyToPurchase = activeDay && activeTime && selected.length > 0;

  // TODO: Reemplazar por IDs reales desde tu backend
  const peliculaId = film._id || film.id || film.slug; // temporal
  const SALA_ID = "REEMPLAZAR_POR_SALA_ID"; // colócalo desde tu DB

  const horarioDate = useMemo(() => {
    if (!activeDay || !activeTime) return null;
    // Ajusta este parser a tu formato real de día/hora
    return new Date(`${activeDay} ${activeTime}`);
  }, [activeDay, activeTime]);

  useEffect(() => {
    setSelected([]);
    if (!horarioDate) {
      setUnavailable([]);
      return;
    }
    if (!peliculaId || !SALA_ID) return;

    let abort = false;
    fetchAvailability({peliculaId, salaId: SALA_ID, horario: horarioDate})
      .then(({taken}) => !abort && setUnavailable(taken || []))
      .catch(() => !abort && setUnavailable([]));
    return () => {
      abort = true;
    };
  }, [peliculaId, SALA_ID, horarioDate]);

  const toggleSeat = (fila, columna) => {
    setSelected((prev) => {
      const exists = prev.some((s) => s.fila === fila && s.columna === columna);
      if (exists)
        return prev.filter((s) => !(s.fila === fila && s.columna === columna));
      return [...prev, {fila, columna}];
    });
  };

  const handlePurchase = async () => {
    if (!horarioDate || selected.length === 0) return;
    if (!isAuthenticated) {
      navigate("/auth/login");
      return;
    }
    try {
      await reserveSeats({
        peliculaId,
        salaId: SALA_ID,
        horario: horarioDate,
        asientos: selected,
      });
      navigate("checkout", {
        state: {
          film: film.title,
          day: activeDay,
          time: activeTime,
          seats: selected,
        },
      });
    } catch (e) {
      alert(e.message || "No se pudo reservar. Intenta nuevamente.");
      // refrescar disponibilidad por si hubo conflicto
      if (horarioDate) {
        fetchAvailability({peliculaId, salaId: SALA_ID, horario: horarioDate})
          .then(({taken}) => setUnavailable(taken || []))
          .catch(() => {});
      }
    }
  };

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
      {film.image && (
        <div className="overflow-hidden rounded-xl ring-1 ring-neutral-700/50 flex justify-between">
          <img
            src={film.image}
            alt={film.title}
            className="w-96 object-cover"
          />

          <div className="w-full items-center flex flex-col">
            <h1 className="text-lg font-semibold text-start w-full">
              HORARIOS
            </h1>
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
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

              {activeDay && activeTime && (
                <div className="mt-4">
                  <h3 className="mb-2 text-sm font-semibold text-neutral-300">
                    Mapa de sala
                  </h3>
                  <Seats
                    unavailable={unavailable}
                    selected={selected}
                    onToggle={toggleSeat}
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
                    : "COMPRAR ENTRADAS"}
                </Button>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}

function Chip({active, onClick, children}) {
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
