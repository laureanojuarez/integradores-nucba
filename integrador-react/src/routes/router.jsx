import {createBrowserRouter} from "react-router";
import NotFoundPage from "../pages/NotFoundPage";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import ContactPage from "../pages/ContactPage";
import ProductsPage from "../pages/ProductsPage";

export const router = createBrowserRouter([
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
