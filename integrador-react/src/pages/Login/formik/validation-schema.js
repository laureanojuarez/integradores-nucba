import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("El mail es invalido")
    .required("El email es requerido"),
  password: Yup.string().required("La contraseña es requerida"),
});
