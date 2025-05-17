import { RiShoppingBagLine } from "@remixicon/react";
import ModalCart from "./ModalCart/ModalCart";
import { useDispatch } from "react-redux";
import { toggleHiddenCart } from "../../redux/slices/cart/cartSlice";
import { useSelector } from "react-redux";
import { Navbar } from "./Navbar";
import { Logo } from "./Logo";
import { useEffect, useState } from "react";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dispatch = useDispatch();

  const handleCartClick = () => {
    dispatch(toggleHiddenCart());
  };

  const cartItemCount = useSelector((state) =>
    state.cart.cartItems.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <header
      className={`flex justify-evenly items-center top-0 w-full bg-stone-100 transition-all duration-300 fixed ${
        isScrolled ? "h-13 shadow-md" : "h-20"
      }`}
    >
      <ModalCart />
      <Logo isScrolled={isScrolled} />
      <Navbar />

      <RiShoppingBagLine
        className="absolute right-5"
        cursor={"pointer"}
        onClick={handleCartClick}
      />
      {cartItemCount > 0 && <span>{cartItemCount}</span>}
    </header>
  );
};
