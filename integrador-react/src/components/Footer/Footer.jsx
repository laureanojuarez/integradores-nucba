export const Footer = () => {
  return (
    <footer>
      <div className="flex items-center justify-center h-16 bg-gray-800 text-white">
        <p>
          &copy; {new Date().getFullYear()} Mi Empresa. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
};
