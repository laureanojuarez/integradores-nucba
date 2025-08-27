export const FilmsSection = ({ films }) => {
  return (
    <section>
      <h2>Peliculas en cartelera</h2>

      <div>
        {films.map((film) => (
          <FilmCard key={film.id} film={film} />
        ))}
      </div>
    </section>
  );
};
