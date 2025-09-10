import {ErrorMessage, Field, Form, Formik} from "formik";
import {registerRequest} from "../../api/auth";
import {useAuth} from "../../context/AuthProvider";

export default function RegisterPage() {
  const {signup} = useAuth();
  const handleSubmit = async (values) => {
    await signup(values);
  };

  return (
    <div>
      <h1>Registro</h1>
      <Formik
        initialValues={{dni: "", username: "", email: "", password: ""}}
        validate={(values) => {
          const errors = {};

          if (!values.dni) {
            errors.dni = "DNI es requerido";
          } else if (!/^\d{7,8}$/.test(values.dni)) {
            errors.dni = "DNI debe tener 7-8 dígitos";
          }

          if (!values.username) {
            errors.username = "Required";
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
        <Form>
          <Field type="text" name="dni" placeholder="DNI" />
          <ErrorMessage
            name="dni"
            component="div"
            className="text-red-400 text-sm mt-1"
          />
          <Field type="text" name="username" placeholder="Nombre de usuario" />
          <ErrorMessage
            name="username"
            component="div"
            className="text-red-400 text-sm mt-1"
          />
          <Field type="email" name="email" placeholder="Correo electrónico" />
          <ErrorMessage
            name="email"
            component="div"
            className="text-red-400 text-sm mt-1"
          />
          <Field type="password" name="password" placeholder="Contraseña" />
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-400 text-sm mt-1"
          />
          <button type="submit">Registrarse</button>
        </Form>
      </Formik>
    </div>
  );
}
