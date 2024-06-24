import { useEffect, useState, Suspense, useRef } from "react";
import css from "./MovieDetailsPage.module.css";
import {
  useParams,
  Outlet,
  Link,
  NavLink,
  useLocation,
} from "react-router-dom";
import { fetchMoviesById } from "../../service/api";
import clsx from "clsx";

const buildNavClass = ({ isActive }) => {
  return clsx(isActive && css.activeNavLink);
};

export const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");
  const location = useLocation();

  useEffect(() => {
    const getMovieById = async () => {
      try {
        const data = await fetchMoviesById(movieId);
        setMovie(data);
      } catch (error) {
        setError(error.message);
      }
    };
    getMovieById();
  }, [movieId]);

  const goBack = useRef(location.state || "/movies");

  return (
    <>
      <Link to={goBack.current} className={css.linkBack}>
        Go back
      </Link>
      <div className={css.div}>
        <div className={css.imgContainer}>
          <img
            className={css.img}
            src={
              movie && movie.backdrop_path
                ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/No_image_available_600_x_400.svg/2560px-No_image_available_600_x_400.svg.png"
            }
            alt={movie?.title}
          />
        </div>
        <div className={css.textContainer}>
          <h4>{movie?.title}</h4>
          <p>User Score: {((movie?.vote_average / 10) * 100).toFixed()}% </p>
          <h5>Overview</h5>
          <p>{movie?.overview}</p>
          <h5>Genres</h5>
          <ul>
            {movie?.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      </div>

      <ul className={css.links}>
        <li>
          <NavLink to="cast" className={buildNavClass}>
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink to="reviews" className={buildNavClass}>
            Reviews
          </NavLink>
        </li>
      </ul>
      <Suspense>
        <Outlet />
      </Suspense>

      {error && <p>{error}</p>}
    </>
  );
};
export default MovieDetailsPage;
