import Home from "../pages/Home/Home";
import {Footer} from "./components/Footer/Footer";
import {Header} from "./components/Header/Header";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <Layout>
      <Header />
      <Home />
      <Footer />
    </Layout>
  );
}

export default App;
