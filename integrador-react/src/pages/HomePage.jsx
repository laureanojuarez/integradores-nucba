import { About } from "../components/About/About";
import { Hero } from "../components/Hero/Hero";
import { ProductSection } from "../components/Products/ProductSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <main className="w-4/5 max-w-6xl mx-auto">
        <section aria-label="Productos destacados">
          <ProductSection />
        </section>
        <section aria-label="Sobre nosotros">
          <About />
        </section>
      </main>
    </>
  );
}
