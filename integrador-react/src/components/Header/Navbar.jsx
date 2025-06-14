import {RiUser2Line} from "@remixicon/react";
import {RiUser3Line} from "@remixicon/react";
import {RiInstagramLine} from "@remixicon/react";
import {Link} from "react-router";

export const Navbar = () => {
  return (
    <nav className="justify-evenly w-full hidden md:flex">
      <ul className="flex gap-4 text-lg text-gray-800">
        <li>Empresa</li>
        <li>
          <Link to={"/productos"}>Productos</Link>
        </li>
      </ul>

      <ul className="flex items-center gap-4 text-lg text-gray-800">
        <li>Home</li>
        <li>
          <Link to={"/contacto"}>Contacto</Link>
        </li>
        <li>
          <Link to={"/login"}>
            <RiUser3Line size={24} />
          </Link>
        </li>
        <li>
          <a
            href="https://www.instagram.com/elterriblepanaderia/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visítanos en Instagram"
            className="hover:text-gray-600"
          >
            <RiInstagramLine size={24} />
          </a>
        </li>
      </ul>
    </nav>
  );
};
