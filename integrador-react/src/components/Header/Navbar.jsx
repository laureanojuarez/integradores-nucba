export function Navbar() {
  return (
    <nav className="w-4/5 max-w-6xl pl-12 justify-start hidden md:flex py-2">
      <ul className="flex gap-16 justify-between">
        <li>
          <a href="/catalogo">Autos</a>
        </li>
        <li>
          <a href="/about">Sobre nosotros</a>
        </li>
        <li>
          <a href="/autos-destacados">Autos destacados</a>
        </li>
      </ul>
    </nav>
  );
}
