import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export const registerRequest = (user) => api.post("/register", user);

export const loginRequest = (user) => api.post("/login", user);

export const verifyTokenRequest = () => api.get("/verify");

export const logout = () => api.post("/logout");
