import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer
      aria-label="Información del sitio"
      className="bg-neutral-800 text-neutral-300"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
        {/* 3 columnas reales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Marca */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white font-semibold text-lg"
            >
              <span className="text-2xl">🚗</span>
              <span>Concesionaria</span>
            </Link>
            <p className="mt-2 text-sm text-neutral-400">
              Tu próximo auto, 100% online. Financiación, entrega segura y
              garantía.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-white transition"
              >
                Instagram
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-white transition"
              >
                Facebook
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="hover:text-white transition"
              >
                YouTube
              </a>
            </div>
          </div>

          {/* Navegación */}
          <nav aria-label="Enlaces" className="grid gap-2">
            <h3 className="text-white font-semibold">Secciones</h3>
            <Link
              to="/catalogo"
              className="text-sm text-neutral-400 hover:text-white transition"
            >
              Productos
            </Link>
            <Link
              to="/contacto"
              className="text-sm text-neutral-400 hover:text-white transition"
            >
              Contacto
            </Link>
            <Link
              to="/"
              className="text-sm text-neutral-400 hover:text-white transition"
            >
              Inicio
            </Link>
          </nav>

          {/* Contacto */}
          <div className="grid gap-2">
            <h3 className="text-white font-semibold">Contacto</h3>
            <a
              href="tel:+541100000000"
              className="text-sm text-neutral-400 hover:text-white transition"
            >
              Tel: +54 11 0000-0000
            </a>
            <a
              href="https://wa.me/541100000000"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-neutral-400 hover:text-white transition"
            >
              WhatsApp: +54 11 0000-0000
            </a>
            <a
              href="mailto:ventas@concesionaria.com"
              className="text-sm text-neutral-400 hover:text-white transition"
            >
              ventas@concesionaria.com
            </a>
            <p className="text-sm text-neutral-400">Lun a Sáb 9:00–19:00</p>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="mt-8 border-t border-neutral-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col">
            <p className="text-sm text-neutral-400">Medios de pago:</p>
            <p className="text-sm text-neutral-400">
              Visa · Mastercard · Amex · Mercado Pago · Transferencia
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm text-neutral-400">
            <Link to="#" className="hover:text-white transition">
              Términos
            </Link>
            <span className="opacity-30">|</span>
            <Link to="#" className="hover:text-white transition">
              Privacidad
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 border-t border-neutral-700 pt-4 text-center text-sm text-neutral-500">
          &copy; {new Date().getFullYear()} Concesionaria. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  );
};
