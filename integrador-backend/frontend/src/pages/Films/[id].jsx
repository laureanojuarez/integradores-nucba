import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../../components/UI/Button";
import { Seats } from "../../components/Seats/Seats";
import { confirmSeat, fetchAvailability, reserveSeats } from "../../api/seats";
import { fetchFilmById } from "../../api/films";
import { CartTab } from "../../components/CartTab/CartTab";

export default function FilmDetail({ film }) {
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
                    <li key={sala.id}>
                      <Chip
                        active={selectedSala === sala.id}
                        onClick={() => {
                          setSelectedSala(sala.id);
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
                  rows={salas.find((s) => s.id === selectedSala)?.filas || 6}
                  leftCols={Math.floor(
                    (salas.find((s) => s.id === selectedSala)?.columnas || 8) /
                      2
                  )}
                  rightCols={Math.ceil(
                    (salas.find((s) => s.id === selectedSala)?.columnas || 8) /
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
