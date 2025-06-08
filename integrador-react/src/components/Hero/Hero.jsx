import heroPanaderia from "../../assets/heroPanaderia.jpg";

export const Hero = () => {
  return (
    <section className="">
      <img
        src={heroPanaderia}
        alt="Portada Panaderia"
        className="w-full h-96 object-cover"
      />
    </section>
  );
};
