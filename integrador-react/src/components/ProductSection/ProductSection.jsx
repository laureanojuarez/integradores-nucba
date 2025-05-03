import { Link } from "react-router";

const ImagenPrueba = () => {
  return <img src="https://placehold.co/350x400" alt="" />;
};

const Card = () => {
  return (
    <div className="gap-2 p-4 border-2 border-gray-300 rounded-lg shadow-md">
      <h1 className="text-xl font-bold">Titulo</h1>
      <p className="text-gray-600">Descripcion</p>
      <ImagenPrueba />
    </div>
  );
};

export const ProductSection = () => {
  return (
    <section className="flex flex-col w-full p-8 justify-center text-center gap-4">
      <div className="flex justify-center items-center gap-2">
        <Card />
        <Card />
        <Card />
      </div>
      <Link to={"/products"}>
        <span>Ver mas</span>
      </Link>
    </section>
  );
};
