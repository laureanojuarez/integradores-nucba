import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import {Provider} from "react-redux";
import {persistor, store} from "./redux/store";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";
import {Toaster} from "sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster position="bottom-left" />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
