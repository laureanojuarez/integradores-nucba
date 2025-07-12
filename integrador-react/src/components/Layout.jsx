import {Outlet} from "react-router";
import {Header} from "./Header/Header";
import {Footer} from "./Footer/Footer";
import {Navbar} from "./Header/Navbar";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-4/5 max-w-6xl mx-auto mt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
