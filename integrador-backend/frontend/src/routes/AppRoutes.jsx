import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import LoginPage from "../pages/Auth/Login";
import RegisterPage from "../pages/Auth/Register";
import FilmDetail from "../pages/Films/[id]";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/films/:slug" element={<FilmDetail />} />
      <Route path="*" element={<h1>Not Found 404</h1>} />
    </Routes>
  );
}
