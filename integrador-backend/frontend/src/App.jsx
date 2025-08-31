import {Footer} from "./components/Footer/Footer";
import {Header} from "./components/Header/Header";
import Layout from "./components/Layout/Layout";
import AppRoutes from "./routes/AppRoutes";
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
