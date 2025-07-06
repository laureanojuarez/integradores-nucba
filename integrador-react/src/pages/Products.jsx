export default function Products() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Nuestros autos destacados</h1>
      <h2>Nuestras marcas:</h2>
      <section className="flex gap-6 flex-wrap items-start justify-center">
        <div>
          <p>Ford</p>
          <img src="https://placehold.co/300x400" alt="" />
        </div>
        <div>
          <p>Peugeot</p>
          <img src="https://placehold.co/300x400" alt="" />
        </div>
        <div>
          <p>Peugeot</p>
          <img src="https://placehold.co/300x400" alt="" />
        </div>
        <div>
          <p>Audi</p>
          <img src="https://placehold.co/300x400" alt="" />
        </div>
      </section>
    </div>
  );
}
