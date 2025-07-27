import {Formik, Form, Field, ErrorMessage} from "formik";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "sonner";

import {registerInitialValues} from "./formik/initial-values";
import {registerValidationSchema} from "./formik/validation-schema";
import {createUser} from "./services/services";

const Register = () => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col justify-center items-center min-h-screen px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Crea tu cuenta</h1>
          <p className="text-gray-600 mt-2">Unite a nosotros!</p>
        </div>

        {/* Formik Form */}
        <Formik
          initialValues={registerInitialValues}
          validationSchema={registerValidationSchema}
          onSubmit={async (values, {setSubmitting}) => {
            try {
              await createUser(values.nombre, values.email, values.password);
              toast.success("Usuario creado correctamente");
              toast.info("Serás redirigido a la página de login");

              setTimeout(() => {
                navigate("/login");
              }, 2000);
            } catch (error) {
              const errorMsg =
                error.response?.data?.errors?.[0]?.msg ||
                error.response?.data?.msg ||
                "Error al crear usuario";
              toast.error(errorMsg);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({isSubmitting}) => (
            <Form className="space-y-4">
              {/* Nombre */}
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nombre completo
                </label>
                <Field
                  type="text"
                  name="nombre"
                  placeholder="Tu nombre completo"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <ErrorMessage
                  name="nombre"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Correo electrónico
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="tu@email.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contraseña
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50"
              >
                {isSubmitting ? "Creando cuenta..." : "Registrarte"}
              </button>
            </Form>
          )}
        </Formik>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes cuenta?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Register;
