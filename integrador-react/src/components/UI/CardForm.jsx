export const CardForm = ({ type, id, name, placeholder, label }) => {
  return (
    <div className="flex flex-col w-1/2">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className="p-2 bg-white rounded-lg"
      />
    </div>
  );
};
