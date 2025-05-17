import { Link } from "react-router";
import logoPanaderia from "../../assets/logo.png";

export const Logo = ({ isScrolled }) => {
  return (
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
  );
};
