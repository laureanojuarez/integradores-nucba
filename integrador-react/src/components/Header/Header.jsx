import { RiInstagramLine } from "@remixicon/react";
import { useEffect, useState } from "react";
import logoPanaderia from "../../assets/logo.png";
import { Link } from "react-router";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`flex justify-evenly items-center top-0 w-full bg-stone-100 transition-all duration-300 z-50 fixed ${
        isScrolled ? "h-13 shadow-md" : "h-20"
      }`}
    >
      <nav className="  text-black ">
        <ul className="flex gap-4 text-lg text-gray-800">
          <li>Empresa</li>
          <Link to={"/productos"}>Productos</Link>
        </ul>
      </nav>
      <Link
        to={"/"}
        className={`absolute transition-all duration-300 ${
          isScrolled ? "top-[-15px] scale-80" : "top-4 scale-100"
        }`}
      >
        <img
          src={logoPanaderia}
          alt="Logo de la panadería"
          className={`h-auto w-32`}
        />
      </Link>

      <nav>
        <ul className="flex justify-center items-center gap-4 text-lg text-gray-800">
          <li>Home</li>
          <li>Contacto</li>
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
    </header>
  );
};
