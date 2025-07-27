import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiEyeLine, RiEyeOffLine } from "@remixicon/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { loginInitialValues } from "./formik/initial-values";
import { loginValidationSchema } from "./formik/validation-schema";
import { loginUser } from "./services/services";
import { setCurrentUser } from "../../redux/slices/user/userSlice";
import AuthInput from "../../components/UI/LoginInput";

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ Agregado

  return (
    <main className="flex flex-col justify-center items-center min-h-screen px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Iniciar Sesión</h1>
          <p className="text-gray-600 mt-2">Bienvenido de vuelta</p>
        </div>

        {/* Formik Form */}
        <Formik
          initialValues={loginInitialValues}
          validationSchema={loginValidationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              console.log("🔍 Enviando datos:", values); // ✅ Debug
              const user = await loginUser(values.email, values.password);
              console.log("✅ Respuesta del servidor:", user); // ✅ Debug

              if (user) {
                const userPayload = {
                  ...user.usuario,
                  token: user.token,
                };
                console.log("🚀 Despachando a Redux:", userPayload); // ✅ Debug

                dispatch(setCurrentUser(userPayload));
                toast.success("Inicio de sesión exitoso");

                // ✅ Navegación después del login
                setTimeout(() => {
                  navigate(state?.redirectedFromCheckout ? "/checkout" : "/");
                }, 1000);
              }
            } catch (error) {
              console.log("❌ Error en login:", error); // ✅ Debug
              toast.error(error?.response?.data?.msg || "Error en el login");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {(
            { isSubmitting } // ✅ Solo usar isSubmitting
          ) => (
            <Form className="space-y-4">
              {/* Email */}
              <AuthInput type="email" placeholder="tu@email.com" name="email" />

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <AuthInput
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    name="password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <RiEyeOffLine size={20} />
                    ) : (
                      <RiEyeLine size={20} />
                    )}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Recordarme</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50"
              >
                {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
              </button>
            </Form>
          )}
        </Formik>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
