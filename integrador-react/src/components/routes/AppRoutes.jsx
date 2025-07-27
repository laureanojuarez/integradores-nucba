import { Routes, Route } from "react-router-dom"; // Quitar BrowserRouter
import CheckoutPage from "../../pages/Chockout/CheckoutPage";
import NotFoundPage from "../../pages/NotFoundPage";
import HomePage from "../../pages/HomePage";
import ProductsPage from "../../pages/Products/ProductsPage";
import { ProductMarca } from "../../pages/Products/[marca]/ProductMarca";
import { ProductDetail } from "../../pages/Products/[id]/ProductDetail";
import ContactPage from "../../pages/ContactPage";
import { LoginPage } from "../../pages/Login/LoginPage";
import Register from "../../pages/Register/Register";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/catalogo" element={<ProductsPage />} />
      <Route path="/catalogo/:marca" element={<ProductMarca />} />
      <Route path="/catalogo/:marca/:modelo" element={<ProductDetail />} />
      <Route path="/contacto" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/checkout"
        element={
          <ProtectedRoute redirectTo="/login">
            <CheckoutPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
