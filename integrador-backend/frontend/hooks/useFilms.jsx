import {useEffect, useState} from "react";
import {fetchFilms} from "../services/fetch";

export function useFilms(title) {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchFilms(title)
      .then((data) => {
        if (!cancelled) setFilms(data);
      })
      .catch((e) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [title]);

  return {films, loading, error};
}
