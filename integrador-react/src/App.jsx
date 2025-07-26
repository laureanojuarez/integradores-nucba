import {Header} from "./components/Header/Header";
import {Footer} from "./components/Footer/Footer";
import Layout from "./components/Layout/Layout";
import AppRoutes from "./components/routes/AppRoutes";

function App() {
  return (
    <Layout>
      <Header />
      <AppRoutes />
      <Footer />
    </Layout>
  );
}

export default App;
