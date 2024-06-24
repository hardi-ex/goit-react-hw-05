import css from "./MoviesPage.module.css";
import toast, { Toaster } from "react-hot-toast";
import { searchMovie } from "../../service/api";
import { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { useLocation, useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      if (query) {
        try {
          const data = await searchMovie(query);
          setFilteredMovies(data);
        } catch (error) {
          setError(error.message);
        }
      }
    };

    fetchData();
  }, [query]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (searchTerm.trim() === "") {
      toast.error("Please enter search term", {});
      return;
    }
    try {
      const data = await searchMovie(searchTerm);
      setFilteredMovies(data);
      setSearchParams({ query: searchTerm });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (evt) => {
    setSearchTerm(evt.target.value);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          onChange={handleChange}
          value={searchTerm}
          className={css.input}
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
      <MovieList movies={filteredMovies} location={location} />
      {error && <p>{error}</p>}
    </>
  );
};
export default MoviesPage;
