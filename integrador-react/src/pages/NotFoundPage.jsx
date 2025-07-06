import {Link} from "react-router";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">
        404 - Pagina no encontrada
      </h1>
      Por lo que vemos la pagina que buscas no existe.{" "}
      <Link to={"/"}>Vuelve atras</Link>
    </div>
  );
}
