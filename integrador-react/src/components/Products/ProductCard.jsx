export const ProductCard = ({ name, desc, img }) => {
  return (
    <div className="gap-2 p-4 border-2 border-gray-300 rounded-lg shadow-md">
      <h1 className="text-xl font-bold">{name}</h1>
      <p className="text-gray-600">{desc}</p>
      <div className="">
        <img src={img} alt={name} style={{ width: "350px" }} />
      </div>
    </div>
  );
};
