import {createBrowserRouter} from "react-router";
import HomePage from "../../pages/Home/HomePage";
import ProductsPage from "../../pages/Products/ProductsPage";
import ContactPage from "../../pages/Contact/ContactPage";
import LoginPage from "../../pages/Login/Login";
import App from "../../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "productos",
        element: <ProductsPage />,
      },
      {
        path: "contacto",
        element: <ContactPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);
