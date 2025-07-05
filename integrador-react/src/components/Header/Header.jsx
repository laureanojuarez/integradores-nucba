import {Navbar} from "./Navbar";

export const Header = () => {
  return (
    <div className="">
      <header className="flex w-full justify-between p-4 items-center">
        <h1>Concesionaria Autos</h1>
        <button className="bg-blue-300 px-6 py-2 rounded-xs hover:bg-white hover:border-1">
          Catalogo
        </button>
      </header>
      <Navbar />
    </div>
  );
};
