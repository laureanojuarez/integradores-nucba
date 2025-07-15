import Tracker from "/images/marcas/ford/f150.webp";
import territory from "/images/marcas/ford/territory.png";

export function Hero() {
  return (
    <section className="flex flex-col items-center bg-blue-200 mt-7 p-4">
      <div className="w-full text-center justify-center items-">
        <p className="text-2xl">Compra Online</p>
        <h1 className="text-3xl">Consegui tu proximo 0km hoy!</h1>
      </div>
      <div className="w-full md:w-1/2 h-64 md:h-50 relative">
        <img
          src={Tracker}
          alt="Ford F-150"
          className="absolute w-[60%] bottom-0 left-[5%] md:left-[5] z-10 transform scale-x-[-1]"
        />

        <img
          src={territory}
          alt="Ford Territory"
          className="absolute w-[55%] bottom-0 right-[5%] z-20 transform scale-x-[-1]"
        />
      </div>
    </section>
  );
}
