import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string().required("El nombre es obligatorio"),
  email: yup
    .string()
    .email("Email inválido")
    .required("El email es obligatorio"),
  phone: yup.string().min(8, "Debe tener al menos 8 dígitos"),
  puesto: yup.string().required("El puesto es obligatorio"),
  concesionario: yup
    .string()
    .required("El nombre del concesionario es obligatorio"),
  marcas: yup.string().required("Debe seleccionar al menos una marca"),
  direccion: yup.string().required("La dirección es obligatoria"),
  ciudad: yup.string().required("La ciudad es obligatoria"),
  provincia: yup.string().required("La provincia es obligatoria"),
  codigoPostal: yup.string().required("El código postal es obligatorio"),
});
