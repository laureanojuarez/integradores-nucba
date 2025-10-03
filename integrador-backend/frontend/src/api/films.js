import axios from "axios";

const TOKEN_API =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTE0NWFiZjY5NTcwMWZlYTU3ZTQyMTFmNTNkYzk4ZSIsIm5iZiI6MTc1Nzg0NzQwMC44MTMsInN1YiI6IjY4YzY5ZjY4YTA2NTNhNWVjOGEwZjI1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Iu5UE0aeQStSSNUtqdn32TdATWQBy4KvP7hnWQz_X6U";

const getPopularMovies = async () => {
  try {
    const response = axios.get("https://api.themoviedb.org/3/movie/popular", {
      headers: {
        Authorization: `Bearer ${TOKEN_API}`,
        Accept: "application/json",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
  }
};

getPopularMovies();
