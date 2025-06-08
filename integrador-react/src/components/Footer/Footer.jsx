import { RiInstagramLine, RiMapPinLine, RiPhoneLine } from "@remixicon/react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-200 border-t border-stone-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Contenido principal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Logo y descripción */}
          <div className="flex flex-col items-center md:items-start">
            <p className="text-gray-700 text-sm text-center md:text-left leading-relaxed">
              Emprendimiento familiar con tradición panadera. Brindando los
              mejores sabores con amor.
            </p>
          </div>

          {/* Información de contacto */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-gray-800 mb-4 text-lg">
              Contacto
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <RiMapPinLine size={18} className="text-amber-600" />
                <span className="text-gray-700 text-sm">
                  Dr. Cue 874, Rosario
                </span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <RiPhoneLine size={18} className="text-amber-600" />
                <a
                  href="https://wa.me/5493417190840"
                  className="text-gray-700 hover:text-amber-600 transition-colors text-sm"
                >
                  +54 9 341 719-0840
                </a>
              </div>
            </div>
          </div>

          {/* Redes sociales */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-gray-800 mb-4 text-lg">
              Síguenos
            </h3>
            <div className="flex justify-center md:justify-start gap-4">
              <a
                href="https://www.instagram.com/elterriblepanaderia/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Instagram"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <RiInstagramLine size={20} />
              </a>
            </div>
            <p className="text-gray-600 text-xs mt-3">@elterriblepanaderia</p>
          </div>
        </div>

        {/* Línea divisoria */}
        <hr className="border-stone-300 my-6" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            © {currentYear} El Terrible Panadería. Todos los derechos
            reservados.
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Hecho con ❤️ en Rosario, Argentina
          </p>
        </div>
      </div>
    </footer>
  );
};
