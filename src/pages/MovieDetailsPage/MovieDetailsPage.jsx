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
import { MagnifyingGlass } from "react-loader-spinner";

const buildNavClass = ({ isActive }) => {
  return clsx(isActive && css.activeNavLink);
};

export const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMovieById = async () => {
      setLoading(true);
      try {
        const data = await fetchMoviesById(movieId);
        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
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
      {loading ? (
        <div className={css.loaderContainer}>
          <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="MagnifyingGlass-loading"
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor="#c0efff"
            color="#e15b64"
          />
        </div>
      ) : (
        <>
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
              <p>
                User Score: {((movie?.vote_average / 10) * 100).toFixed()}%{" "}
              </p>
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
          <Suspense
            fallback={
              <div className={css.loaderContainer}>
                <MagnifyingGlass
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="MagnifyingGlass-loading"
                  wrapperClass="MagnifyingGlass-wrapper"
                  glassColor="#c0efff"
                  color="#e15b64"
                />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </>
      )}

      {error && <p>{error}</p>}
    </>
  );
};
export default MovieDetailsPage;
