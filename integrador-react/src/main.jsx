import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import App from "./App";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/Products/ProductsPage";
import {ProductMarca} from "./pages/Products/[marca]/ProductMarca";
import {ProductDetail} from "./pages/Products/[id]/ProductDetail";
import ContactPage from "./pages/ContactPage";
import CheckoutPage from "./pages/Chockout/CheckoutPage";
import NotFoundPage from "./pages/NotFoundPage";
import {BrowserRouter, Route, Routes} from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="catalogo" element={<ProductsPage />} />
            <Route path="catalogo/:marca" element={<ProductMarca />} />
            <Route path="catalogo/:marca/:modelo" element={<ProductDetail />} />
            <Route path="contacto" element={<ContactPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
