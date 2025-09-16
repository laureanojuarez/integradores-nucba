import { Outlet } from "react-router-dom";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import Layout from "./components/Layout/Layout";
import { AuthProvider } from "./context/AuthContext";
function App() {
  return (
    <AuthProvider>
      <Layout>
        <Header />
        <Outlet />
        <Footer />
      </Layout>
    </AuthProvider>
  );
}

export default App;
