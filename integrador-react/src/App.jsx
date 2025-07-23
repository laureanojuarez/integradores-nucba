import {Outlet} from "react-router";
import {CartTab} from "./components/Cart/CartTab";
import {useState} from "react";
import {Header} from "./components/Header/Header";
import {Footer} from "./components/Footer/Footer";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <Header onCartClick={handleCartToggle} />
      {isCartOpen && <CartTab closeCart={handleCartToggle} />}
      <main className="pt-36">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
