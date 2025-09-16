import { Link, useNavigate } from "react-router-dom";
import { Form, Field, ErrorMessage, Formik } from "formik";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading, error, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (values) => {
    const result = await login(values);
    if (result.success) {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div>
        {error && (
          <div className="bg-red-500 text-white p-2 mb-2 rounded-md">
            {error}
          </div>
        )}
      </div>
      <h1>Buenas!, que bueno verte por aca</h1>
      <div className="w-96">
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) errors.email = "Requerido";
            else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            )
              errors.email = "Email invalido";
            if (!values.password) errors.password = "Requerido";
            else if (values.password.length < 6)
              errors.password =
                "La contraseña debe tener al menos 6 caracteres";
            return errors;
          }}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col gap-4">
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-400 text-sm mt-1"
            />
            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-black px-4 py-2 rounded-md w-full font-medium hover:bg-gray-100 transition"
            >
              {loading ? "Ingresando..." : "Iniciar Sesion"}
            </button>
          </Form>
        </Formik>
        <span>Olvide mi contraseña</span>
        <div className="w-full justify-between flex">
          <span>No tienes cuenta?</span>
          <Link to={"/register"}>
            <span className="text-blue-300">Registrate</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
