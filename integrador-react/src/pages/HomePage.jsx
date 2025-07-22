import {About} from "../components/About/About";
import {Hero} from "../components/Hero/Hero";
import {ProductSection} from "../components/Products/ProductSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="w-4/5 max-w-6xl mx-auto">
        <ProductSection />
        <About />
      </div>
    </>
  );
}
