import {Navbar} from "./Navbar";
import {RiSearchLine} from "@remixicon/react";
import {Button} from "../UI/Button";
import {RiShoppingCart2Fill} from "@remixicon/react";
import {Link} from "react-router";
import {useSelector} from "react-redux";
import {RiMenuFill} from "@remixicon/react";
import {RiUserLine} from "@remixicon/react";
import {useState} from "react";
import {RiCloseLine} from "@remixicon/react";

export const Header = ({onCartClick}) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <header className="fixed items-center flex flex-col w-full top-0 py-2 bg-white/90 mx-auto justify-center left-1/2 -translate-x-1/2 z-50 border-1 border-blue-300 gap-2">
        <section className="flex w-4/5 max-w-6xl justify-between items-center">
          <div className="flex gap-2 w-full ">
            <Link to={"/"}>
              <img src="/images/icono.png" alt="" className="w-10 rounded-lg" />
            </Link>
            <div className="hidden border rounded-xl md:flex items-center justify-start w-3/4">
              <RiSearchLine className="text-gray-500 m-2" />
              <input
                type="text"
                placeholder="Buscar autos..."
                className="border-none outline-none px-2 py-1 rounded-xl"
              />
            </div>
          </div>
          <div className="hidden md:flex gap-4 items-center">
            <Button
              linkto={"catalogo"}
              nombre={"Catalogo"}
              bg={"bg-blue-500"}
              hv={"hover:bg-white"}
              txt={"text-white"}
              hvtxt={"hover:text-blue-500"}
            />
            <Button
              linkto={"contacto"}
              nombre={"Contacto"}
              bg={"bg-white"}
              hv={"hover:bg-blue-500"}
              txt={"text-blue-500"}
              hvtxt={"hover:text-white"}
            />
            <RiShoppingCart2Fill
              cursor={"pointer"}
              onClick={onCartClick}
              className=""
            />
            {totalQuantity > 0 && (
              <span className="absolute right-2 top-2 bg-red-500 text-white text-xs rounded-full px-1">
                {totalQuantity}
              </span>
            )}
            <RiUserLine />
          </div>
          <div onClick={toggleMenu} className="md:hidden cursor_pointer z-50">
            {isMenuOpen ? <RiCloseLine size={30} /> : <RiMenuFill size={30} />}
          </div>
        </section>
        {/* Input en modo mobile */}
        <div className="flex border rounded-xl items-center justify-start w-full md:hidden">
          <RiSearchLine className="text-gray-500 m-2" />
          <input
            type="text"
            placeholder="Buscar autos..."
            className="border-none outline-none px-2 py-1 rounded-xl"
          />
        </div>
        <Navbar />
      </header>

      {/* Menú Mobile */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white z-40 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <nav className="h-full flex flex-col justify-center items-center">
          <ul className="flex flex-col gap-8 text-center text-2xl">
            <li>
              <Link to="/catalogo" onClick={toggleMenu}>
                Autos
              </Link>
            </li>
            <li>
              <Link to="/autos" onClick={toggleMenu}>
                Sobre nosotros
              </Link>
            </li>
            <li>
              <Link to="/contacto" onClick={toggleMenu}>
                Autos destacados
              </Link>
            </li>
            <li className="flex items-center gap-2 pt-4 border-t border-gray-200">
              <RiUserLine />
              <Link to="/login" onClick={toggleMenu}>
                Iniciar Sesión
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
