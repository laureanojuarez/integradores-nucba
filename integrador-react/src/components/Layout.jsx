import {Outlet} from "react-router";
import {Header} from "./Header/Header";
import {Footer} from "./Footer/Footer";
import {CartTab} from "./Cart/CartTab";
import {useState} from "react";

export default function Layout() {
  const [isCartIsOpen, setIsCartOpen] = useState(false);
  const handleCart = () => {
    setIsCartOpen(!isCartIsOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onCartClick={handleCart} />
      {isCartIsOpen && <CartTab closeCart={handleCart} />}
      <main className="flex-1 w-4/5 max-w-6xl mx-auto mt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
