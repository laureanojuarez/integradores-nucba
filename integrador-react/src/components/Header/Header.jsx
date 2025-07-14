import {Navbar} from "./Navbar";
import {RiSearchLine} from "@remixicon/react";
import {Button} from "../UI/Button";
import concesionariaIcon from "../../../public/images/icono.png";
import {RiShoppingCart2Fill} from "@remixicon/react";
import {useState} from "react";
import {Link} from "react-router";

export const Header = ({onCartClick}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <header className="fixed items-center flex flex-col w-full top-0 py-2 bg-white/50 mx-auto justify-center left-1/2 -translate-x-1/2 z-50">
      <section className="flex w-full justify-evenly">
        <div className="flex gap-2">
          <Link to={"/"}>
            <img src={concesionariaIcon} alt="" className="w-10 rounded-lg" />
          </Link>
          <div className="border rounded-xl flex items-center justify-center">
            <RiSearchLine className="text-gray-500 m-2" />
            <input
              type="text"
              placeholder="Buscar autos..."
              className="border-none outline-none px-2 py-1 rounded-xl"
            />
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Button
            linkto={"catalogo"}
            nombre={"Catalogo"}
            bg={"bg-blue-500"}
            hv={"hover:bg-white"}
          />
          <Button
            linkto={"contacto"}
            nombre={"Contacto"}
            bg={"bg-white"}
            hv={"hover:bg-blue-500"}
          />
          <RiShoppingCart2Fill
            cursor={"pointer"}
            onClick={onCartClick}
            className="absolute right-0 mr-8"
          />
        </div>
      </section>
      <Navbar />
    </header>
  );
};
