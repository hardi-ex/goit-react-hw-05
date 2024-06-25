import { useEffect, useState } from "react";
import { fetchPopularMovies } from "../../service/api";
import MovieList from "../../components/MovieList/MovieList";
import { useLocation } from "react-router-dom";
import css from "./HomePage.module.css";
import { MagnifyingGlass } from "react-loader-spinner";

export const HomePage = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [error, setError] = useState("");
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPopularMovies = async () => {
      setLoading(true);
      try {
        const data = await fetchPopularMovies();
        setPopularMovies(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getPopularMovies();
  }, []);

  return (
    <>
      <h2 className={css.topic}>Popular Films:</h2>
      {loading ? (
        <div className={css.loader}>
          <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="magnifying-glass-loading"
            wrapperStyle={{}}
            wrapperClass="magnifying-glass-wrapper"
            glassColor="#c0efff"
            color="#c94747"
          />
        </div>
      ) : (
        <MovieList movies={popularMovies} location={location} />
      )}
      {error && <p>{error}</p>}
    </>
  );
};
export default HomePage;
