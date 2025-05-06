import { useEffect } from "react";
import { useLocation } from "react-router";

export default function Layout({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <div className="w-full h-auto flex flex-col">{children}</div>;
}
