import Tracker from "/images/marcas/ford/f150.webp";
import territory from "/images/marcas/ford/territory.png";

export function Hero() {
  return (
    <div className="flex items-center bg-blue-200 h-140 w-full">
      <div className="w-1/2 flex justify-center h-full items-center flex-col text-left">
        <p className="w-1/2 text-2xl">Compra Online</p>
        <h1 className="text-3xl w-1/2">Consegui tu proximo 0km hoy!</h1>
      </div>
      <div className="w-1/2 relative flex justify-center items-center h-full">
        <img
          src={Tracker}
          alt=""
          width={"500px"}
          className="relative left-20 bottom-15 transform scale-x-[-1] "
        />
        <img
          src={territory}
          alt=""
          width={"450px"}
          className="relative top-15 right-60 transform scale-x-[-1]"
        />
      </div>
    </div>
  );
}
