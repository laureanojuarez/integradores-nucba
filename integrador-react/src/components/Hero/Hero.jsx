import Tracker from "/images/marcas/ford/f150.webp";
import territory from "/images/marcas/ford/territory.png";

export function Hero() {
  return (
    <div className="flex flex-col items-center bg-blue-200">
      <div className="">
        <p className="w-1/2 text-2xl">Compra Online</p>
        <h1 className="text-3xl w-1/2">Consegui tu proximo 0km hoy!</h1>
      </div>
      <div className="">
        <img src={Tracker} alt="" width={"500px"} className="" />
        <img src={territory} alt="" width={"450px"} className="" />
      </div>
    </div>
  );
}
