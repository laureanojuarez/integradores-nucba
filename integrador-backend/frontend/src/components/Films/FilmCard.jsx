export const FilmCard = ({ film }) => {
  return (
    <div>
      <img src={film} alt="" />
      <h1>{film.title}</h1>
      <span>{film.available}</span>
    </div>
  );
};
