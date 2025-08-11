import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Feature } from "../../components/About/AboutFeature";

export default function About() {
  useEffect(() => {
    document.title = "Sobre Nosotros | Concesionaria";
  }, []);

  return (
    <main className="mt-7">
      <section
        aria-label="Presentación"
        className="mx-4 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
      >
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold">Sobre Nosotros</h1>
          <p className="mt-3 text-white/90 max-w-2xl mx-auto">
            Tu próximo auto, a un clic. Comprá online con financiación, entrega
            segura y garantía.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              to="/catalogo"
              className="inline-flex items-center rounded-md bg-white text-blue-700 px-4 py-2 font-medium hover:bg-white/90 transition"
            >
              Ver Autos
            </Link>
            <Link
              to="/contacto"
              className="inline-flex items-center rounded-md border border-white/60 px-4 py-2 font-medium hover:bg-white/10 transition"
            >
              Contacto
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-6 py-12 space-y-12">
        <div className="flex flex-start">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold">
              Nuestra misión
            </h2>
            <p className="mt-3 text-gray-700">
              Somos una concesionaria de autos dedicada a ofrecerte la mejor
              experiencia de compra online.
            </p>
            <p className="mt-2 text-gray-700">
              Contamos con una amplia variedad de vehículos 0km y usados, de las
              principales marcas del mercado.
            </p>
            <p className="mt-2 text-gray-700">
              Nuestro objetivo es ayudarte a encontrar el auto ideal para vos y
              tu familia, con asesoramiento personalizado, transparencia y
              confianza en cada paso.
            </p>
          </div>
        </div>

        <section aria-label="Por qué elegirnos">
          <h2 className="text-xl md:text-2xl font-semibold">
            Por qué elegirnos
          </h2>
          <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Feature
              title="Financiación flexible"
              desc="Cuotas fijas y planes a tu medida con aprobación rápida."
              icon="💳"
            />
            <Feature
              title="Vehículos certificados"
              desc="Usados inspeccionados con historial y garantía."
              icon="✅"
            />
            <Feature
              title="Entrega en todo el pais"
              desc="Logística segura y seguimiento en tiempo real."
              icon="🚚"
            />
            <Feature
              title="Atencion 360°"
              desc="Acompañamiento antes, durante y después de tu compra."
              icon="🤝"
            />
          </div>
        </section>

        <section
          aria-label="Nuestros compromisos"
          className="bg-gray-50 rounded-lg p-6"
        >
          <h2 className="text-lg md:text-xl font-semibold">
            Nuestros compromisos
          </h2>
          <ul className="mt-3 list-disc pl-6 text-gray-700">
            <li>Precios competitivos y promociones exclusivas.</li>
            <li>Atención al cliente antes, durante y después de tu compra.</li>
            <li>Entrega rápida y segura en todo el país.</li>
            <li>Garantía y respaldo en todos nuestros vehículos.</li>
          </ul>
        </section>

        <section
          aria-label="Llamada a la accion"
          className="flex flex-col md:flex-row items-center justify-between gap-4 bg-blue-50 border border-blue-100 rounded-xl p-6"
        >
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-blue-900">
              ¿Listo para encontrar tu próximo auto?
            </h3>
            <p className="text-blue-900/80">
              Explorá nuestro catálogo o hablá con un asesor ahora.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/productos"
              className="inline-flex items-center rounded-md bg-blue-600 text-white px-4 py-2 font-medium hover:bg-blue-700 transition"
            >
              Ver catalogo
            </Link>
            <Link
              to="/contacto"
              className="inline-flex items-center rounded-md border border-blue-600 text-blue-700 px-4 py-2 font-medium hover:bg-blue-600/10 transition"
            >
              Hablar con un asesor
            </Link>
          </div>
        </section>

        <p className="text-center text-gray-600">
          ¡Gracias por elegirnos para tu proximo auto!
        </p>
      </section>
    </main>
  );
}
