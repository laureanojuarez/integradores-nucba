import {createBrowserRouter} from "react-router";
import NotFoundPage from "../pages/NotFoundPage";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import ContactPage from "../pages/ContactPage";
import ProductsPage from "../pages/Products/ProductsPage";
import {ProductDetail} from "../pages/Products/[id]/ProductDetail";
import {ProductMarca} from "../pages/Products/[marca]/ProductMarca";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "catalogo",
        element: <ProductsPage />,
      },
      {
        path: "catalogo/:marca/:modelo",
        element: <ProductDetail />,
      },
      {
        path: "catalogo/:marca",
        element: <ProductMarca />,
      },
      {
        path: "contacto",
        element: <ContactPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
