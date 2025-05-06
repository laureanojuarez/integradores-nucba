import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Campo requerido"),
  password: Yup.string().required("La contraseña es requerida"),
});
