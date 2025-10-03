// ...existing code...
import {useEffect, useState} from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";

export default function Home() {
  const TOKEN_API =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTE0NWFiZjY5NTcwMWZlYTU3ZTQyMTFmNTNkYzk4ZSIsIm5iZiI6MTc1Nzg0NzQwMC44MTMsInN1YiI6IjY4YzY5ZjY4YTA2NTNhNWVjOGEwZjI1YiIsInNjb3BlcyI6WyJhcGlfcmVhCJdLCJ2ZXJzaW9uIjoxfQ.Iu5UE0aeQStSSNUtqdn32TdATWQBy4KvP7hnWQz_X6U";

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const {data} = await axios.get(
          "https://api.themoviedb.org/3/movie/popular",
          {
            headers: {
              Authorization: `Bearer ${TOKEN_API}`,
              accept: "application/json",
            },
          }
        );
        setMovies(data.results || []);
        console.log(data);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    getPopularMovies();
  }, []);

  return (
    <Layout>
      <h1>Hola</h1>
      {/* ejemplo: mostrar títulos */}
      <ul>
        {movies.map((m) => (
          <div key={m.id}>
            <li>{m.title}</li>
            <img
              src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
              alt={m.title}
              style={{maxWidth: "500px", width: "250px"}}
            />
          </div>
        ))}
      </ul>
    </Layout>
  );
}
// ...existing code...
