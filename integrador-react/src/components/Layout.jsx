import {Outlet} from "react-router";
import {Header} from "./Header/Header";
import {Footer} from "./Footer/Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
