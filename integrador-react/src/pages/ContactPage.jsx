import { CardForm } from "../components/UI/CardForm";

export default function ContactPage() {
  return (
    <main>
      <section className="flex flex-wrap flex-col bg-gray-300 p-2 gap-4">
        <h1 className="text-2xl">Tus Datos</h1>
        <form className="flex flex-col gap-2">
          <div className="flex gap-2">
            <CardForm
              label="Nombre y apellido:"
              id="name"
              name="name"
              type="text"
              placeholder="Ej: Laureano Juarez"
            />
            <CardForm
              label="Correo electrónico:"
              id="email"
              name="email"
              type="email"
              placeholder="Ej: hola@concesionaria.com"
            />
          </div>

          <div className="flex gap-2">
            <CardForm
              label="Teléfono:"
              id="phone"
              name="phone"
              type="tel"
              placeholder="Ej: 3413711746"
            />
            <CardForm
              label="Puesto:"
              id="puesto"
              name="puesto"
              type="text"
              placeholder="Puesto"
            />
          </div>
        </form>

        <h1 className="text-2xl">Los datos del concesionario</h1>
        <form className="flex flex-wrap gap-4">
          <div className="flex gap-2 w-full">
            <CardForm
              label="Nombre del concesionario:"
              id="concesionario"
              name="concesionario"
              type="text"
              placeholder="Ej: El Concesionario S.A."
            />
            <div className="flex flex-col gap-2 w-1/2">
              <label htmlFor="marcas">Marca(s) que comercializan:</label>
              <select id="marcas" name="marcas">
                <option value="ford">Ford</option>
                <option value="chevrolet">Chevrolet</option>
                <option value="fiat">Fiat</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 w-full">
            <CardForm
              label="Dirección:"
              id="direccion"
              name="direccion"
              type="text"
              placeholder="Ej: Av. Corrientes 1234"
            />
            <CardForm
              label="Ciudad:"
              id="ciudad"
              name="ciudad"
              type="text"
              placeholder="Ej: Buenos Aires"
            />
          </div>

          <div className="flex gap-2 w-full">
            <CardForm
              label="Código Postal:"
              id="codigoPostal"
              name="codigoPostal"
              type="text"
              placeholder="Ej: 1426"
            />
            <CardForm
              label="Provincia:"
              id="provincia"
              name="provincia"
              type="text"
              placeholder="Provincia"
            />
          </div>
        </form>
      </section>
    </main>
  );
}
