export const Seats = ({
  unavailable = [],
  selected = [],
  onToggle,
  rows = 6,
  leftCols = 4,
  rightCols = 4,
}) => {
  const isTaken = (r, c) =>
    unavailable.some((s) => s.fila === r && s.columna === c);
  const isSelected = (r, c) =>
    selected.some((s) => s.fila === r && s.columna === c);

  const seats = [];
  for (let r = 1; r <= rows; r++) {
    for (let c = 1; c <= leftCols; c++) {
      const taken = isTaken(r, c);
      const sel = isSelected(r, c);
      seats.push(
        <Seat
          key={`L-${r}-${c}`}
          variant={taken ? "unavailable" : sel ? "selected" : "available"}
          onClick={() => !taken && onToggle?.(r, c)}
        />
      );
    }
    // derecha: columnas 5..8 (ignorando el pasillo visual)
    for (let c = 5; c <= 4 + rightCols; c++) {
      const taken = isTaken(r, c);
      const sel = isSelected(r, c);
      seats.push(
        <Seat
          key={`R-${r}-${c}`}
          variant={taken ? "unavailable" : sel ? "selected" : "available"}
          onClick={() => !taken && onToggle?.(r, c)}
        />
      );
    }
  }

  return (
    <div className="w-full max-w-md mx-auto mt-6 select-none">
      <Stage />
      <div className="mt-4 rounded-2xl bg-neutral-800/40 p-4 shadow-inner border border-neutral-700/60">
        <div className="grid grid-cols-[repeat(4,1fr)_auto_repeat(4,1fr)] gap-2 items-center">
          <Aisle rows={rows} />
          {seats}
        </div>
      </div>
      <Legend />
    </div>
  );
};

const Stage = () => (
  <div className="mx-auto w-11/12">
    <div className="h-10 bg-gradient-to-b from-neutral-300 to-neutral-500 text-neutral-900 rounded-b-3xl shadow-md flex items-center justify-center tracking-wide font-medium">
      Escenario
    </div>
  </div>
);

const Aisle = ({ rows }) => (
  <div
    className="col-start-5 self-stretch rounded-md border border-blue-500/30 bg-gradient-to-b from-blue-400/10 via-blue-500/10 to-blue-600/10 relative shadow-inner"
    style={{ gridRow: `1 / span ${rows}` }}
  >
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="-rotate-90 text-[10px] sm:text-xs font-medium tracking-widest text-blue-200">
        PASILLO
      </span>
    </div>
  </div>
);

const Seat = ({ variant = "available", onClick }) => {
  const base =
    "relative w-7 h-7 sm:w-8 sm:h-8 rounded-md border shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] transition-colors";
  const foot =
    "before:content-[''] before:absolute before:-bottom-1 before:left-1/2 before:-translate-x-1/2 before:w-2.5 before:h-1 before:rounded-sm";
  const styles = {
    available:
      "bg-emerald-500/20 border-emerald-400/40 hover:bg-emerald-400/30 hover:border-emerald-300/60 before:bg-emerald-400/60 cursor-pointer",
    selected:
      "bg-emerald-500 border-emerald-600 ring-2 ring-emerald-400/50 before:bg-emerald-600 cursor-pointer",
    unavailable:
      "bg-rose-500/40 border-rose-500/60 opacity-70 cursor-not-allowed before:bg-rose-600/80",
  };
  return (
    <div
      className={`${base} ${foot} ${styles[variant]}`}
      aria-label={`seat-${variant}`}
      onClick={onClick}
    />
  );
};

const Legend = () => (
  <div className="mt-3 flex items-center justify-center gap-4 text-xs text-neutral-300">
    <div className="flex items-center gap-2">
      <Seat />
      <span>Disponible</span>
    </div>
    <div className="flex items-center gap-2">
      <Seat variant="selected" />
      <span>Seleccionada</span>
    </div>
    <div className="flex items-center gap-2">
      <Seat variant="unavailable" />
      <span>Ocupada</span>
    </div>
  </div>
);
