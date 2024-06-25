import css from "./MoviesPage.module.css";
import toast, { Toaster } from "react-hot-toast";
import { searchMovie } from "../../service/api";
import { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { useLocation, useSearchParams } from "react-router-dom";
import { MagnifyingGlass } from "react-loader-spinner";

const MoviesPage = () => {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      if (query) {
        setLoading(true);
        try {
          const data = await searchMovie(query);
          setFilteredMovies(data);
          setError("");
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [query]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (searchTerm.trim() === "") {
      toast.error("Please enter search term", {});
      return;
    }
    setSearchParams({ query: searchTerm });
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
        <MovieList movies={filteredMovies} location={location} />
      )}

      {error && <p>{error}</p>}
    </>
  );
};

export default MoviesPage;
