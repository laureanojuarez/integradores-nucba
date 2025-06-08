export const About = () => {
  return (
    <section className="w-full bg-gradient-to-br from-stone-50 to-stone-100 py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-100">
          {/* Header con ícono */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
              <span className="text-2xl">🥖</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Sobre Nosotros
            </h2>
            <div className="w-20 h-1 bg-amber-400 mx-auto rounded-full"></div>
          </div>

          {/* Contenido */}
          <div className="space-y-6 text-center md:text-left">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light">
              Somos un{" "}
              <span className="font-semibold text-amber-600">
                emprendimiento familiar
              </span>
              , descendiente de familia panadera. ¡Soñando y siempre brindando
              con amor los mejores sabores en panificados y galletería!
            </p>

            <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light">
              Nos enorgullece poder transmitir y brindar lo mejor de nosotros en
              cada desayuno o merienda de sus hogares.
            </p>

            <div className="bg-amber-50 rounded-xl p-6 border-l-4 border-amber-400">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium italic">
                "Los esperamos a todos para que degusten y nos conozcan, y así
                poder seguir creciendo y soñando juntos. ¡Los esperamos!"
              </p>
            </div>
          </div>

          {/* Stats o características */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 pt-8 border-t border-gray-100">
            <div className="text-center">
              <div className="text-2xl mb-2">👨‍👩‍👧‍👦</div>
              <h3 className="font-semibold text-gray-800">Familiar</h3>
              <p className="text-sm text-gray-600">Tradición generacional</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">❤️</div>
              <h3 className="font-semibold text-gray-800">Con Amor</h3>
              <p className="text-sm text-gray-600">
                Cada producto hecho con cariño
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🥐</div>
              <h3 className="font-semibold text-gray-800">Calidad</h3>
              <p className="text-sm text-gray-600">Los mejores sabores</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
