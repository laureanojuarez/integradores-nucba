import { ErrorMessage, Field } from "formik";
const AuthInput = ({ type, placeholder, name }) => {
  return (
    <Field name={name}>
      {({ field, form: { errors, touched } }) => (
        <section>
          <input
            type={type}
            placeholder={placeholder}
            name={name}
            {...field}
            isError={errors[field.name] && touched[field.name]}
          />

          <ErrorMessage name={name}>
            {(msg) => <div className="error-message">{msg}</div>}
          </ErrorMessage>
        </section>
      )}
    </Field>
  );
};

export default AuthInput;
