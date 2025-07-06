import {createBrowserRouter} from "react-router";
import NotFoundPage from "../pages/NotFoundPage";
import Products from "../pages/Products";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";

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
        path: "productos",
        element: <Products />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
