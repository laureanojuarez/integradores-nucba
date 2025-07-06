import {Outlet} from "react-router";
import {Header} from "./Header/Header";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <>fOOTER</>
    </div>
  );
}
