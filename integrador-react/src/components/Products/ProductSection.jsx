import { Link } from "react-router";
import { ProductCard } from "./ProductCard";
import { products } from "../../mock/products";

export const ProductSection = () => {
  return (
    <section className="flex flex-col w-full p-8 justify-center text-center gap-4 ">
      <div className="flex justify-center items-center gap-2 flex-wrap">
        {products.map((p, index) => (
          <ProductCard key={index} name={p.name} desc={p.desc} img={p.img} />
        ))}
      </div>
      <Link to={"/productos"}>
        <span>Ver mas</span>
      </Link>
    </section>
  );
};
