const fakeDelay = (ms) => new Promise((res) => setTimeout(res, ms));

export const createUser = async (nombre, email, password) => {
  await fakeDelay(1000);

  const users = JSON.parse(localStorage.getItem("users_db")) || [];

  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    throw new Error("El correo electrónico ya está registrado.");
  }

  const newUser = {
    id: Date.now(),
    nombre,
    email,
    password,
  };

  localStorage.setItem("users_db", JSON.stringify([...users, newUser]));

  return {
    data: {
      user: {
        id: newUser.id,
        nombre: newUser.nombre,
        email: newUser.email,
      },
    },
  };
};
