import {ProductCard} from "../components/Products/ProductCard";
import {autos} from "../mock/autos";

export default function Products() {
  return (
    <main className="flex flex-col items-center justify-center">
      <h1>Nuestros autos destacados</h1>
      <h2>Nuestras marcas:</h2>
      <section className="flex flex-wrap gap-4 justify-center ">
        {autos.map((auto) => (
          <ProductCard
            key={auto.id}
            id={auto.id}
            marca={auto.marca}
            modelo={auto.modelo}
            imagen={auto.imagen}
            precio={auto.precio}
          />
        ))}
      </section>
    </main>
  );
}
