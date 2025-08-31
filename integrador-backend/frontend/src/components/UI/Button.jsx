export const Button = ({bg, children}) => {
  return (
    <button
      className={`${bg} text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors`}
    >
      {children}
    </button>
  );
};
