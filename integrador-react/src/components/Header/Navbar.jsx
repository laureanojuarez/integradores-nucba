export function Navbar() {
  return (
    <nav className="flex">
      <ul className="flex gap-4 w-full justify-between">
        <li>
          <a href="/">Autos</a>
        </li>
        <li>
          <a href="/autos">Sobre nosotros</a>
        </li>
        <li>
          <a href="/contacto">Autos destacados</a>
        </li>
      </ul>
    </nav>
  );
}
