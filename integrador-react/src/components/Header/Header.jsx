import { Navbar } from "./Navbar";
import { RiSearchLine } from "@remixicon/react";
import { Button } from "../UI/Button";
import { RiShoppingCart2Fill } from "@remixicon/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RiMenuFill, RiUserLine, RiCloseLine } from "@remixicon/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { CartTab } from "../Cart/CartTab";
import { toggleHiddenCart } from "../../redux/slices/cart/cartSlice";
import { MobileMenu } from "./MobileMenu";

export const Header = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const hidden = useSelector((state) => state.cart.hidden);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
            <div className="relative">
              <RiShoppingCart2Fill
                size={24}
                className="cursor-pointer text-gray-700 hover:text-blue-500 transition-colors"
                onClick={() => dispatch(toggleHiddenCart())}
              />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full  w-4 flex items-center justify-center font-semibold">
                  {totalQuantity}
                </span>
              )}
            </div>
            <Link to={"/login"} className="text-gray-500">
              <RiUserLine className="cursor-pointer" />
            </Link>
          </div>
          <div onClick={toggleMenu} className="md:hidden cursor_pointer z-50">
            {isMenuOpen ? (
              <RiCloseLine size={30} className="cursor-pointer" />
            ) : (
              <RiMenuFill size={30} className="cursor-pointer" />
            )}
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

      {!hidden && <CartTab />}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};
