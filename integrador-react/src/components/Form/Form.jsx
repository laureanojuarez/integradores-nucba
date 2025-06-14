import {Formik, Form} from "formik";
import {initialValues} from "./formik/initial-values";
import {InputField} from "./formik/InputField";

export default function FormFormik() {
  return (
    <Formik
      initialValues={{
        initialValues: initialValues,
      }}
    >
      <Form>
        <InputField label={"Nombre"} name={"name"} type="text" />
        <InputField label={"Apellido"} name={"lastname"} type="text" />
        <InputField label={"Email"} name={"email"} type="email" />
        <InputField label={"Mensaje"} name={"message"} type="text" />
        <button>Enviar</button>
      </Form>
    </Formik>
  );
}
