import {Link, useLocation} from "react-router";
import {ProductCard} from "./ProductCard";
import {products} from "../../mock/products";

export const ProductSection = () => {
  const location = useLocation();
  const isMainPage = location.pathname === "/";
  return (
    <section className="flex flex-col w-full p-8 justify-center text-center gap-4 ">
      <div className="flex justify-center items-center gap-2 flex-wrap">
        {(isMainPage ? products.slice(0, 3) : products).map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            desc={product.desc}
            img={product.img}
            id={product.id}
          />
        ))}
      </div>

      {isMainPage && (
        <Link to={"/productos"}>
          <span>Ver mas</span>
        </Link>
      )}
    </section>
  );
};
