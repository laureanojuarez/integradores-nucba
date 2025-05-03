import { Link } from "react-router";

export const Header = () => {
  return (
    <header className="border-t border-b border-gray-500 fixed text-white flex justify-between items-center w-full h-16  px-4">
      <Link to={"/"} className="text-2xl font-bold">
        <img src="https://placehold.co/55" alt="Img 400" />
      </Link>
      <nav className="flex gap-2">
        <Link to={"/"}>Home</Link>
        <Link to={"/About"}>About</Link>
        <a href="">Carrito</a>
      </nav>
    </header>
  );
};
