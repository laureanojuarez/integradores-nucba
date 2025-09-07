import { useNavigate, useParams } from "react-router-dom";
import { films } from "../../mock/films";
import { useState } from "react";
import { Button } from "../../components/UI/Button";

export default function FilmDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const film = films.find((f) => f.slug === slug);

  const [activeDay, setActiveDay] = useState(null);
  const [activeTime, setActiveTime] = useState(null);

  const days = Object.keys(film.showtimes);
  const isReadyToPurchase = activeDay && activeTime;

  const handlePurchase = () => {
    if (isReadyToPurchase) {
      navigate("/login");
    }
  };

  if (!film) {
    return (
      <div className="mt-10">
        <p className="text-sm text-neutral-400">Película no encontrada.</p>
      </div>
    );
  }

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
            className="w-96  object-cover"
          />

          <div className="w-full  items-center flex flex-col">
            <h1 className="text-lg font-semibold text-start w-full">
              HORARIOS
            </h1>
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
                Días
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {days.map((day) => (
                  <li
                    key={day}
                    className={`rounded px-6 py-2 text-xs cursor-pointer ${
                      activeDay === day
                        ? "bg-neutral-100/30 text-black font-bold"
                        : "bg-neutral-700/30 text-neutral-200"
                    }`}
                    onClick={() => {
                      setActiveDay(day);
                      setActiveTime(null);
                    }}
                  >
                    {day}
                  </li>
                ))}
              </ul>
              {activeDay && (
                <>
                  <h2 className="mt-4 text-sm font-semibold uppercase tracking-wide text-neutral-400">
                    Horarios
                  </h2>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {film.showtimes[activeDay].map((time) => (
                      <li
                        key={time}
                        className={`rounded px-6 py-2 text-xs cursor-pointer ${
                          activeTime === time
                            ? "bg-neutral-100/30 text-black font-bold"
                            : "bg-neutral-700/30 text-neutral-200"
                        }`}
                        onClick={() => setActiveTime(time)}
                      >
                        {time}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <Button
                bg={isReadyToPurchase ? "bg-red-500" : "bg-gray-500"}
                hv={isReadyToPurchase ? "bg-red-600" : "bg-gray-600"}
                onClick={handlePurchase}
                disabled={!isReadyToPurchase}
              >
                COMPRAR ENTRADAS
              </Button>
            </section>
          </div>
          <div></div>
        </div>
      )}
    </div>
  );
}
