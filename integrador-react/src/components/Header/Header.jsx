import { Navbar } from "./Navbar";
import { RiSearchLine } from "@remixicon/react";
import { Button } from "../UI/Button";

export const Header = () => {
  return (
    <div className="max-w-5xl mx-auto w-full">
      <header className="flex justify-between py-2 items-center">
        <div className="flex gap-2">
          <div className="bg-blue-200 p-2 rounded-2xl">
            <h1>ConcesionariaAutos</h1>
          </div>
          <div className="border rounded-xl flex items-center justify-center">
            <RiSearchLine className="text-gray-500 m-2" />
            <input
              type="text"
              placeholder="Buscar autos..."
              className="border-none outline-none px-2 py-1 rounded-xl"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <Button
            linkto={"catalogo"}
            nombre={"Catalogo"}
            bg={"bg-blue-500"}
            hv={"hover:bg-white"}
          />
          <Button
            linkto={"contacto"}
            nombre={"Nombre"}
            bg={"bg-white"}
            hv={"hover:bg-blue-500"}
          />
        </div>
      </header>
      <Navbar />
    </div>
  );
};
