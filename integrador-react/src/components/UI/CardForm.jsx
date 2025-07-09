export const CardForm = ({
  type,
  id,
  name,
  placeholder,
  label,
  value,
  onChange,
  onBlur,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="p-2 bg-white rounded-lg"
      />
    </div>
  );
};
