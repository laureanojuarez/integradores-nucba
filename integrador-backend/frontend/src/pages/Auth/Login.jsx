import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1>Buenas!, que bueno verte por aca</h1>
      <div className="w-96">
        <form action="" className="flex flex-col gap-4">
          <input type="text" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button className="bg-white text-black px-4 py-2 rounded-md w-full">
            Iniciar Sesion
          </button>
        </form>
        <span>Olvide mi contraseña</span>
        <Link to={"/register"}>
          <button className="w-full px-4 py-2 bg-red-500">CREAR CUENTA</button>
        </Link>
      </div>
    </div>
  );
}
