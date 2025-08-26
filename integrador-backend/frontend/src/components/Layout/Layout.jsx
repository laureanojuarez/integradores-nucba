import {useEffect} from "react";

const Layout = ({children}) => {
  const {pathname} = window.location;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <main className="">{children}</main>;
};

export default Layout;
