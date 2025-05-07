import { Link } from "react-router";
import { ProductCard } from "./ProductCard";
import { products } from "../../mock/products";

export const ProductSection = ({ isProductPage }) => {
  const productToShow = isProductPage ? products : products.slice(0, 3);

  return (
    <section className="flex flex-col w-full p-8 justify-center text-center gap-4 ">
      <div className="flex justify-center items-center gap-2 flex-wrap">
        {productToShow.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            desc={product.desc}
            img={product.img}
            isProductPage={isProductPage}
          />
        ))}
      </div>

      {!isProductPage && (
        <Link to={"/productos"}>
          <span>Ver mas</span>
        </Link>
      )}
    </section>
  );
};
