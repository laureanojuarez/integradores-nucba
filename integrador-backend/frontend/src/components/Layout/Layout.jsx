import {useEffect} from "react";
import {Header} from "../Header/Header";
import {Footer} from "../Footer/Footer";

const Layout = ({children}) => {
  const {pathname} = window.location;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return;
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>;
};

export default Layout;
