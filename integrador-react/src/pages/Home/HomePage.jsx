import {Hero} from "../../components/Hero/Hero";
import {About} from "../../components/About/About";
import {ProductSection} from "../../components/Products/ProductSection";

const HomePage = () => {
  return (
    <main>
      <Hero />
      <ProductSection isProductPage={false} />
      <About />
    </main>
  );
};

export default HomePage;
