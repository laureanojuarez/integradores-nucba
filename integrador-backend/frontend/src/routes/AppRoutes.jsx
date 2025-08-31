import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home/Home";
import LoginPage from "../pages/Auth/Login";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="*" element={<h1>Not Found 404</h1>} />
    </Routes>
  );
}
