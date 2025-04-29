import { createBrowserRouter } from "react-router";
import { HomePage } from "../../pages/Home/Home";
import { Layout } from "../components/Layout/Layout";
import { AboutPage } from "../../pages/About/About";
import ProductsPage from "../../pages/Products/ProductsPage";
import LoginPage from "../../pages/Login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      {
        path: "products",
        Component: ProductsPage,
      },
      {
        path: "login",
        Component: LoginPage,
      },
    ],
  },
]);
