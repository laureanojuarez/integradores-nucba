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
    <main className="flex flex-col justify-center items-center gap-2">
      <h1>Publica en nuestro concesionario!</h1>
      <section className="flex flex-wrap flex-col bg-gray-300 w-2xl p-2 gap-4 rounded-xl">
        <h1 className="text-2xl">Tus Datos</h1>
        <form className="flex flex-col gap-2" onSubmit={formik.handleSubmit}>
          <div className="flex gap-2">
            <div className="w-1/2">
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
            <div className="w-1/2">
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

          <div className="flex gap-2">
            <div className="w-1/2">
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
            <div className="w-1/2">
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

          <h1 className="text-2xl">Los datos del concesionario</h1>
          <div className="flex gap-2">
            <div className="w-1/2">
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
            <div className="w-1/2">
              <label htmlFor="marcas">Marca(s) que comercializan:</label>
              <select
                id="marcas"
                name="marcas"
                value={formik.values.marcas}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="p-2 bg-white rounded-xl w-full"
              >
                <option value="">Seleccionar</option>
                <option value="ford">Ford</option>
                <option value="chevrolet">Chevrolet</option>
                <option value="fiat">Fiat</option>
              </select>
              {formik.touched.marcas && formik.errors.marcas && (
                <span className="text-red-500 text-xs">
                  {formik.errors.marcas}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-2 w-full">
            <div className="w-1/2">
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
            <div className="w-1/2">
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

          <div className="flex gap-2 w-full">
            <div className="w-1/2">
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
            <div className="w-1/2">
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
          <div className="flex justify-end w-full">
            <button
              type="submit"
              className="px-8 py-4 bg-blue-400 rounded-xl"
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
