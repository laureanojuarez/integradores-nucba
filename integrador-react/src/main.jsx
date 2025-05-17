import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App";
import ProductsPage from "../pages/Products/ProductsPage";
import { HomePage } from "../pages/Home/Home";
import { Provider } from "react-redux";
import store from "./redux/store";
import ContactPage from "../pages/Contact/ContactPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {},
      {
        path: "productos",
        element: <ProductsPage />,
      },
      {
        path: "contacto",
        element: <ContactPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
