import {RiUserLine} from "@remixicon/react";
import {Link} from "react-router-dom";

export const MobileMenu = ({isOpen, onClose}) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-white z-40 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out md:hidden`}
      onClick={onClose}
    >
      <nav className="h-full flex flex-col justify-center items-center">
        <ul className="flex flex-col gap-8 text-center text-2xl">
          <li>
            <Link to="/catalogo" onClick={onClose}>
              Catalogo
            </Link>
          </li>
          <li>
            <Link to="/autos" onClick={onClose}>
              Sobre nosotros
            </Link>
          </li>
          <li>
            <Link to="/contacto" onClick={onClose}>
              Contacto
            </Link>
          </li>
          <li className="flex items-center gap-2 pt-4 border-t border-gray-200">
            <RiUserLine />
            <Link to="/login" onClick={onClose}>
              Iniciar Sesión
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
