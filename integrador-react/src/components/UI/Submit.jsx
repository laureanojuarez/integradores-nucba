const Submit = ({ children, onClick, disabled = false }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      onClick={onClick}
      className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Submit;
