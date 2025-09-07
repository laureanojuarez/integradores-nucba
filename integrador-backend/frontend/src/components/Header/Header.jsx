import { User } from "lucide-react";
import logo_cine_rosario from "/images/logo_cine_rosario.png";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="h-16  text-white flex items-center justify-between border-b border-neutral-500">
      <Link to={"/"}>
        <img src={logo_cine_rosario} alt="" className="w-72" />
      </Link>
      <nav className="flex items-center list-none">
        <li>Peliculas</li>

        <Link to={"/login"}>
          <User />
        </Link>
      </nav>
    </header>
  );
};
