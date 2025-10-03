import { Outlet } from "react-router-dom";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import Layout from "./components/Layout/Layout";
function App() {
  return (
    <Layout>
      <Header />
      <Outlet />
      <Footer />
    </Layout>
  );
}

export default App;
