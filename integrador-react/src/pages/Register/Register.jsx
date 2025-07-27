import { Formik } from "formik";
import { Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { registerInitialValues } from "./formik/initial-values";
import { registerValidationSchema } from "./formik/validation-schema";
import { createUser } from "./services/services";
import Submit from "../../components/UI/Submit";
import AuthInput from "../../components/UI/LoginInput";

const Register = () => {
  const navigate = useNavigate();

  createUser("Laureano", "laureano@example.com", "password123");

  return (
    <main className="flex flex-col justify-center items-center min-h-screen px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Crea tu cuenta</h1>
          <p className="text-gray-600 mt-2">Unite a nosotros!</p>
        </div>

        <Formik
          initialValues={registerInitialValues}
          validationSchema={registerValidationSchema}
          onSubmit={async (values) => {
            try {
              await createUser(values.nombre, values.email, values.password);
              toast.success("Usuario creado correctamente");
              toast.info("Serás redirigido a la página de login");
              setTimeout(() => {
                navigate("/login");
              }, 2000);
            } catch (error) {
              toast.error(error.response.data.errors[0].msg);
            }
          }}
        >
          <Form className="space-y-4">
            <AuthInput
              type="text"
              placeholder=" Nombre completo"
              name="nombre"
            />

            <AuthInput type="email" name="email" placeholder="tu@email.com" />

            <AuthInput type="password" name="password" placeholder="••••••••" />

            <div className="text-center">
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ¿Ya tienes cuenta? Inicia sesión
              </Link>
            </div>

            <Submit>Registrarse</Submit>
          </Form>
        </Formik>
      </div>
    </main>
  );
};

export default Register;
