import Tracker from "/images/marcas/ford/f150.webp";
import territory from "/images/marcas/ford/territory.png";

export function Hero() {
  return (
    <section className="flex flex-col items-center bg-gradient-to-b from-blue-100 to-blue-200 mt-7 p-4 min-h-[500px] lg:min-h-[600px]">
      <div className="w-full text-center mb-8 lg:mb-12">
        <p className="text-lg md:text-xl text-blue-600 font-medium mb-2">
          Compra Online
        </p>
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
          Conseguí tu próximo <span className="text-blue-600">0km</span> hoy!
        </h1>
      </div>

      <div className="w-full max-w-4xl h-64 md:h-80 lg:h-96 xl:h-[28rem] relative overflow-hidden">
        <img
          src={Tracker}
          alt="Ford F-150"
          className="
            absolute 
            w-[55%] sm:w-[45%] md:w-[42%] lg:w-[40%] xl:w-[38%]
            bottom-[25%] sm:bottom-[28%] md:bottom-[30%] lg:bottom-[32%]
            left-[15%] sm:left-[20%] md:left-[25%] lg:left-[28%]
            z-10 
            transform scale-x-[-1]
            drop-shadow-lg
          "
        />

        <img
          src={territory}
          alt="Ford Territory"
          className="
            absolute 
            w-[50%] sm:w-[40%] md:w-[38%] lg:w-[36%] xl:w-[34%]
            bottom-[10%] sm:bottom-[12%] md:bottom-[15%] lg:bottom-[18%]
            right-[15%] sm:right-[20%] md:right-[25%] lg:right-[28%]
            z-20 
            transform scale-x-[-1]
            drop-shadow-xl
          "
        />

        <div className="absolute inset-0 bg-gradient-to-t from-blue-300/20 to-transparent pointer-events-none" />
      </div>

      <div className="mt-8 lg:mt-12">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105">
          Ver Catálogo
        </button>
      </div>
    </section>
  );
}
