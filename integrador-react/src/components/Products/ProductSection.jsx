import { Link } from "react-router-dom";

export const ProductSection = () => {
  const productRenderer = [
    {
      id: 1,
      marca: "Ford",
      modelo: "F-150",
      imagen: "/images/ford.webp",
    },
    {
      id: 2,
      marca: "Fiat",
      modelo: "Pulse",
      imagen: "/images/fiat.webp",
    },
    {
      id: 3,
      marca: "Chevrolet",
      modelo: "Tracker",
      imagen: "/images/chevrolet.webp",
    },
    {
      id: 4,
      marca: "Volkswagen",
      modelo: "T-Cross",
      imagen: "/images/volkswagen.webp",
    },
  ];

  return (
    <section className="w-full flex flex-col items-center justify-center gap-4 p-4">
      <h2>Busca por marca</h2>
      <section className="flex justify-center items-center text-center gap-4 flex-wrap">
        {productRenderer.map((product) => (
          <div
            className="flex flex-col w-48 h-48 border-2 border-blue-200 rounded-lg shadow hover:shadow-lg justify-evenly items-center hover:scale-105 transition-transform duration-300"
            key={product.id}
          >
            <Link to={`/catalogo/${product.marca.toLowerCase()}`}>
              <div className="h-32 flex items-center justify-center">
                <img
                  src={product.imagen}
                  alt={`${product.marca} ${product.modelo}`}
                  className="w-32 object-cover mb-2 rounded"
                />
              </div>
            </Link>
            <h3 className="text-lg font-semibold">{product.marca}</h3>
          </div>
        ))}
      </section>
    </section>
  );
};
