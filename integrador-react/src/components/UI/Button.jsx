import {Link} from "react-router-dom";

export const Button = ({linkto, bg, hv, nombre, txt, hvtxt}) => {
  return (
    <Link
      to={linkto}
      className={`px-6 py-2 rounded-lg border-1 ${bg} ${hv} ${txt} ${hvtxt} transition-colors duration-300`}
    >
      {nombre}
    </Link>
  );
};
