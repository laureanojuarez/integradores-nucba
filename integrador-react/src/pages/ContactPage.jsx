import {useFormik} from "formik";
import {CardForm} from "../components/UI/CardForm";
import {validationSchema} from "../schemas";

export default function ContactPage() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      puesto: "",
      concesionario: "",
      marcas: "",
      direccion: "",
      ciudad: "",
      provincia: "",
      codigoPostal: "",
    },
    onSubmit: (values) => {
      console.log("Form values:", values);
    },
    validationSchema,
  });

  return (
    <main className="flex flex-col justify-center items-center mt-16 px-4">
      <h1 className="text-2xl md:text-3xl text-center mb-8">
        Publica en nuestro concesionario!
      </h1>
      <section className="flex flex-col bg-gray-300 w-full max-w-4xl p-4 md:p-6 gap-4 rounded-xl">
        <h1 className="text-xl md:text-2xl">Tus Datos</h1>
        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          {/* Nombre y Email */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <CardForm
                label="Nombre y apellido:"
                id="name"
                name="name"
                type="text"
                placeholder="Ej: Laureano Juarez"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <span className="text-red-500 text-xs">
                  {formik.errors.name}
                </span>
              )}
            </div>
            <div className="w-full md:w-1/2">
              <CardForm
                label="Correo electrónico:"
                id="email"
                name="email"
                type="email"
                placeholder="Ej: hola@concesionaria.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <span className="text-red-500 text-xs">
                  {formik.errors.email}
                </span>
              )}
            </div>
          </div>

          {/* Teléfono y Puesto */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <CardForm
                label="Teléfono:"
                id="phone"
                name="phone"
                type="tel"
                placeholder="Ej: 3413711746"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phone && formik.errors.phone && (
                <span className="text-red-500 text-xs">
                  {formik.errors.phone}
                </span>
              )}
            </div>
            <div className="w-full md:w-1/2">
              <CardForm
                label="Puesto:"
                id="puesto"
                name="puesto"
                type="text"
                placeholder="Puesto"
                value={formik.values.puesto}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.puesto && formik.errors.puesto && (
                <span className="text-red-500 text-xs">
                  {formik.errors.puesto}
                </span>
              )}
            </div>
          </div>

          <h1 className="text-xl md:text-2xl mt-4">
            Los datos del concesionario
          </h1>

          {/* Concesionario y Marcas */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <CardForm
                label="Nombre del concesionario:"
                id="concesionario"
                name="concesionario"
                type="text"
                placeholder="Ej: El Concesionario S.A."
                value={formik.values.concesionario}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.concesionario && formik.errors.concesionario && (
                <span className="text-red-500 text-xs">
                  {formik.errors.concesionario}
                </span>
              )}
            </div>
            <div className="w-full md:w-1/2">
              <div className="flex flex-col">
                <label htmlFor="marcas">Marca(s) que comercializan:</label>
                <select
                  id="marcas"
                  name="marcas"
                  value={formik.values.marcas}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="p-2 bg-white rounded-lg w-full"
                >
                  <option value="">Seleccionar</option>
                  <option value="ford">Ford</option>
                  <option value="chevrolet">Chevrolet</option>
                  <option value="fiat">Fiat</option>
                </select>
              </div>
              {formik.touched.marcas && formik.errors.marcas && (
                <span className="text-red-500 text-xs">
                  {formik.errors.marcas}
                </span>
              )}
            </div>
          </div>

          {/* Dirección y Ciudad */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <CardForm
                label="Dirección:"
                id="direccion"
                name="direccion"
                type="text"
                placeholder="Ej: Av. Corrientes 1234"
                value={formik.values.direccion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.direccion && formik.errors.direccion && (
                <span className="text-red-500 text-xs">
                  {formik.errors.direccion}
                </span>
              )}
            </div>
            <div className="w-full md:w-1/2">
              <CardForm
                label="Ciudad:"
                id="ciudad"
                name="ciudad"
                type="text"
                placeholder="Ej: Buenos Aires"
                value={formik.values.ciudad}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.ciudad && formik.errors.ciudad && (
                <span className="text-red-500 text-xs">
                  {formik.errors.ciudad}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <CardForm
                label="Código Postal:"
                id="codigoPostal"
                name="codigoPostal"
                type="text"
                placeholder="Ej: 1426"
                value={formik.values.codigoPostal}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.codigoPostal && formik.errors.codigoPostal && (
                <span className="text-red-500 text-xs">
                  {formik.errors.codigoPostal}
                </span>
              )}
            </div>
            <div className="w-full md:w-1/2">
              <CardForm
                label="Provincia:"
                id="provincia"
                name="provincia"
                type="text"
                placeholder="Provincia"
                value={formik.values.provincia}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.provincia && formik.errors.provincia && (
                <span className="text-red-500 text-xs">
                  {formik.errors.provincia}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-center md:justify-end w-full mt-4">
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-4 bg-blue-400 hover:bg-blue-500 rounded-xl text-white font-medium transition-colors"
              disabled={formik.isSubmitting}
            >
              Registrarme
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
