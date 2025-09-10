import { ErrorMessage, Field, Form, Formik } from "formik";
import { useAuth } from "../../context/AuthProvider";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const handleSubmit = async (values) => {
    await signup(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-black">
      <div className="w-full max-w-md bg-neutral-800 rounded-lg p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-white">
          Registro
        </h1>

        {registerErrors.length > 0 && (
          <div className="bg-red-900/30 border border-red-600 rounded p-3 mb-4">
            {registerErrors.map((error, i) => (
              <div key={i} className="text-red-400 text-sm">
                {error}
              </div>
            ))}
          </div>
        )}

        <Formik
          initialValues={{ dni: "", username: "", email: "", password: "" }}
          validate={(values) => {
            const errors = {};

            if (!values.dni) {
              errors.dni = "DNI es requerido";
            } else if (!/^\d{7,8}$/.test(values.dni)) {
              errors.dni = "DNI debe tener 7-8 dígitos";
            }

            if (!values.username) {
              errors.username = "Nombre de usuario es requerido";
            }

            if (!values.email) {
              errors.email = "Email es requerido";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
              errors.email = "Email inválido";
            }

            if (!values.password) {
              errors.password = "Contraseña es requerida";
            } else if (values.password.length < 6) {
              errors.password = "Contraseña debe tener al menos 6 caracteres";
            }

            return errors;
          }}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col">
              <Field
                type="text"
                name="dni"
                placeholder="DNI"
                className="p-3 bg-neutral-700 border border-neutral-600 rounded text-white placeholder-neutral-400 focus:outline-none focus:border-red-500"
              />
              <ErrorMessage
                name="dni"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>

            <div className="flex flex-col">
              <Field
                type="text"
                name="username"
                placeholder="Nombre de usuario"
                className="p-3 bg-neutral-700 border border-neutral-600 rounded text-white placeholder-neutral-400 focus:outline-none focus:border-red-500"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>

            <div className="flex flex-col">
              <Field
                type="email"
                name="email"
                placeholder="Correo electrónico"
                className="p-3 bg-neutral-700 border border-neutral-600 rounded text-white placeholder-neutral-400 focus:outline-none focus:border-red-500"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>

            <div className="flex flex-col">
              <Field
                type="password"
                name="password"
                placeholder="Contraseña"
                className="p-3 bg-neutral-700 border border-neutral-600 rounded text-white placeholder-neutral-400 focus:outline-none focus:border-red-500"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded transition-colors mt-4"
            >
              Registrarse
            </button>
          </Form>
        </Formik>

        <div className="text-center mt-6">
          <p className="text-neutral-400 text-sm">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-red-400 hover:text-red-300">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
