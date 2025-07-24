import Tracker from "/images/marcas/ford/f150.webp";
import territory from "/images/marcas/ford/territory.png";

export function Hero() {
  return (
    <section className="flex flex-col items-center bg-blue-200 mt-7 p-4">
      <div className="w-full text-center justify-center items-">
        <p className="text-2xl">Compra Online</p>
        <h1 className="text-3xl">Consegui tu proximo 0km hoy!</h1>
      </div>
      <div className="w-full md:w-1/2 h-64 md:h-96 relative ">
        <img
          src={Tracker}
          alt="Ford F-150"
          className="absolute w-[50%] sm:w-[40%] md:w-[60%] bottom-[30%] left-1/2 z-10 transform -translate-x-2/3 scale-x-[-1]"
        />

        <img
          src={territory}
          alt="Ford Territory"
          className="absolute w-[45%] sm:w-[35%] md:w-[55%] bottom-[15%] left-1/2 right-[5%] z-20 transform -translate-x-1/3 scale-x-[-1]"
        />
      </div>
    </section>
  );
}
