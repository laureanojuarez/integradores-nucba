export function Navbar() {
  return (
    <nav className="flex w-full justify-center">
      <ul className="flex gap-16 justify-between">
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
