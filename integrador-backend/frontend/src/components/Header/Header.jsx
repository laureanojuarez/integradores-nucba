import { User } from "lucide-react";
import cine_rosario from "/images/cine_rosario.png";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="h-16  text-white flex items-center justify-between px-4 border-b border-neutral-500">
      <Link to={"/"}>
        <img src={cine_rosario} alt="" className="w-12" />
      </Link>
      <nav className="flex items-center">
        <li>Peliculas</li>

        <Link to={"/login"}>
          <User />
        </Link>
      </nav>
    </header>
  );
};
