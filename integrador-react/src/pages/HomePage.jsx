import {About} from "../components/About/about";
import {Hero} from "../components/Hero/Hero";
import {ProductSection} from "../components/Products/ProductSection";

export default function HomePage() {
  return (
    <main className="w-full">
      <Hero />
      <ProductSection />
      <About />
    </main>
  );
}
