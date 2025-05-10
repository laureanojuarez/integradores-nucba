export default function Button({ children, onClick }) {
  return (
    <button
      className={`mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center gap-2`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
