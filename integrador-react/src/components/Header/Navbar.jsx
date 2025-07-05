export function Navbar() {
  return (
    <nav className="flex w-full bg-blue-50 justify-center">
      <ul className="flex gap-4">
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
