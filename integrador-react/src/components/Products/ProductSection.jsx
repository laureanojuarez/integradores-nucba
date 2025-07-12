import {Link} from "react-router";

export const ProductSection = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center gap-8">
      <h2>Busca por marca</h2>
      <div className="flex justify-center items-center text-center gap-4">
        <div>
          <div className="p-16 bg-blue-100 rounded-2xl"></div>
          <p>Ford</p>
        </div>
        <div>
          <div className="p-16 bg-blue-100 rounded-2xl"></div>
          <p>Fiat</p>
        </div>
        <div>
          <div className="p-16 bg-blue-100 rounded-2xl"></div>
          <p>Chevrolet</p>
        </div>
        <div>
          <div className="p-16 bg-blue-100 rounded-2xl"></div>
          <p>Volkswagen</p>
        </div>
      </div>
      <Link to={"catalogo"}>Ver todas las marcas</Link>
    </section>
  );
};
