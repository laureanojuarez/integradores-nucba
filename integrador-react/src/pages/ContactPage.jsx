export default function ContactPage() {
  return (
    <main>
      <section className="flex flex-wrap flex-col bg-gray-300 p-2 h-96">
        <h1>Tus Datos</h1>
        <form className="flex flex-wrap gap-4 flex-col">
          <div className="flex gap-2">
            <div className="flex flex-col w-1/2">
              <label htmlFor="name">Nombre y apellido:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Ej: Laureano Juarez"
                className="p-2 bg-white rounded-lg"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="email">Correo electrónico:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Ej: hola@concesionaria.com"
                className="p-2 bg-white rounded-lg"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col w-1/2">
              <label htmlFor="phone">Teléfono:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Ej: 3413711746"
                className="p-2 bg-white rounded-lg"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="puesto">Puesto:</label>
              <input
                type="text"
                id="puesto"
                name="puesto"
                placeholder="Puesto"
                className="p-2 bg-white rounded-lg"
              />
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}
