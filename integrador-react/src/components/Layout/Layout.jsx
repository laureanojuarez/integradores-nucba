import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <main className="w-full h-auto flex flex-col mt-20">{children}</main>;
};

export default Layout;
