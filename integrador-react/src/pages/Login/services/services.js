import {toast} from "sonner";

const fakeDelay = (ms) => new Promise((res) => setTimeout(res, ms));

export const loginUser = async (email, password) => {
  await fakeDelay(1000);

  const users = JSON.parse(localStorage.getItem("users_db")) || [];

  const foundUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!foundUser) {
    toast.error("Email o contraseña incorrectos.");
    throw new Error("Credenciales inválidas");
  }

  return {
    user: {
      id: foundUser.id,
      nombre: foundUser.nombre,
      email: foundUser.email,
    },
    token: "fake-jwt-token-for-simulation",
  };
};
