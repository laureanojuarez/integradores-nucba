import { Link } from "react-router";

export const Header = () => {
  return (
    <header className="w-full h-16 bg-blue-200 flex justify-between items-center px-4">
      <img src="https://placehold.co/55" alt="Img 400" />
      <nav className="flex gap-2">
        <Link to={"/"}>Home</Link>
        <Link to={"/About"}>About</Link>
        <a href="">Carrito</a>
      </nav>
    </header>
  );
};
