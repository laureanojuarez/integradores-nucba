import { createBrowserRouter } from "react-router";
import NotFoundPage from "../pages/NotFoundPage";
import Products from "../pages/Products";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import ContactPage from "../pages/ContactPage";

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
        element: <Products />,
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
