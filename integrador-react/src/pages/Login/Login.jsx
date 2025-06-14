import {Form, Formik} from "formik";
import {loginInitialValues} from "./formik/initial-values";
import {loginValidationSchema} from "./formik/validation-schema";
import {Link} from "react-router";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Iniciar Sesión
        </h1>
        <Formik
          initialValues={loginInitialValues}
          validationSchema={loginValidationSchema}
          onSubmit={async (values) => {
            try {
              const user = await loginUser(values.email, values.password);
              console.log(user);
              if (user) {
                dispatch(
                  setCurrentUser({
                    ...user.usuario,
                    token: user.token,
                  })
                );
                toast.success("Inicio de sesión exitoso");
              }
            } catch (error) {
              toast.error(error.response.data.msg);
            }
          }}
        >
          <Form className="space-y-4">
            <AuthInput
              type="text"
              placeholder="Email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <AuthInput
              type="password"
              placeholder="Password"
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <Link to="/forgot-password" className="hover:underline">
                ¿Olvidaste tu contraseña?
              </Link>
              <Link to="/register" className="hover:underline">
                ¿No tenes cuenta? Crea una
              </Link>
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Ingresar
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
