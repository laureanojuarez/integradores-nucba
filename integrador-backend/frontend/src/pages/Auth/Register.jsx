import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/auth/authSlice";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((s) => s.auth);

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  const handleSubmit = async (values) => {
    const action = await dispatch(
      registerUser({
        nombre: values.username,
        email: values.email,
        password: values.password,
      })
    );
    if (registerUser.fulfilled.match(action)) {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-black">
      <div className="w-full max-w-md bg-neutral-800 rounded-lg p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-white">
          Registro
        </h1>

        {error && (
          <div className="bg-red-900/30 border border-red-600 rounded p-3 mb-4">
            <div className="text-red-400 text-sm">{error}</div>
          </div>
        )}
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          validate={(values) => {
            const errors = {};

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
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded transition-colors mt-4"
            >
              {loading ? "Registrando..." : "Registrarse"}
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
