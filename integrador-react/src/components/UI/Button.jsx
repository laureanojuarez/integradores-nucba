import { Link } from "react-router";

export const Button = ({ linkto, bg, hv, nombre }) => {
  return (
    <Link to={linkto} className={`px-6 py-2 rounded-lg border-1 ${bg} ${hv} `}>
      {nombre}
    </Link>
  );
};
