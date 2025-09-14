import {User} from "lucide-react";
import logo_cine_rosario from "/images/logo_cine_rosario.png";
import {Link, useNavigate} from "react-router-dom";

import {logout} from "../../redux/slices/auth/authSlice";
import {useDispatch, useSelector} from "react-redux";

export const Header = () => {
  const {token} = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="h-16  text-white flex items-center justify-between border-b border-neutral-500">
      <Link to={"/"} className="cursor-pointer">
        <img src={logo_cine_rosario} alt="" className="w-72" />
      </Link>
      <nav className="flex items-center list-none gap-4">
        <li>Peliculas</li>

        {token ? (
          <>
            <Link to={"/perfil"}>
              <User />
            </Link>
            <button onClick={handleLogout}>
              <li>Logout</li>
            </button>
          </>
        ) : (
          <Link to={"/login"}>
            <li>Iniciar Sesion</li>
          </Link>
        )}
      </nav>
    </header>
  );
};
