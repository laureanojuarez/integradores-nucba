import {Button} from "../../components/UI/Button";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Buenas!, que bueno verte por aca</h1>
      <form action="" className="flex flex-col gap-4">
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Iniciar Sesion</button>
      </form>
      <span>Olvide mi contraseña</span>
      <Button bg={"bg-red-500"}>CREAR CUENTA</Button>
    </div>
  );
}
