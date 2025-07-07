export const ProductCard = ({ marca, modelo, precio, imagen }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <p>{marca}</p>
      <p>{modelo}</p>
      <img
        src={imagen || "https://placehold.co/300x350"}
        alt=""
        width={"300px"}
      />
      <p>{precio}</p>
    </div>
  );
};
