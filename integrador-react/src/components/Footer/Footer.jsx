export const Footer = () => {
  return (
    <footer>
      <div className="flex items-center justify-center h-[30vh] bg-white text-white">
        <p className="text-gray-500 text-center">
          &copy; {new Date().getFullYear()} Mi Empresa. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
};
