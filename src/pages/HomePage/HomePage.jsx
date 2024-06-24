import { useEffect, useState } from "react";
import { fetchPopularMovies } from "../../service/api";
import MovieList from "../../components/MovieList/MovieList";
import { useLocation } from "react-router-dom";
import css from "./HomePage.module.css";

export const HomePage = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [error, setError] = useState("");
  const location = useLocation();

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const data = await fetchPopularMovies();
        setPopularMovies(data);
      } catch (error) {
        setError(error.message);
      }
    };

    getPopularMovies();
  }, []);

  return (
    <>
      <h2 className={css.topic}>Popular Films:</h2>
      <MovieList movies={popularMovies} location={location} />
      {error && <p>{error}</p>}
    </>
  );
};
export default HomePage;
