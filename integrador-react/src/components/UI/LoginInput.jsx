import { ErrorMessage, Field } from "formik";

const AuthInput = ({ type, placeholder, name }) => {
  return (
    <Field name={name}>
      {({ field, form: { errors, touched } }) => (
        <div className="mb-4">
          <input
            type={type}
            placeholder={placeholder}
            name={name}
            {...field}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors[field.name] && touched[field.name]
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          <ErrorMessage name={name}>
            {(msg) => <div className="text-red-500 text-xs mt-1">{msg}</div>}
          </ErrorMessage>
        </div>
      )}
    </Field>
  );
};

export default AuthInput;
