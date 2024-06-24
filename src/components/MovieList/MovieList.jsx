import { Link } from "react-router-dom";
import css from "./MovieList.module.css";

export const MovieList = ({ movies, location }) => {
  return (
    <>
      <ul className={css.ul}>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link
              to={`/movies/${movie.id}`}
              className={css.link}
              state={location}
            >
              <img
                className={css.img}
                src={
                  movie.backdrop_path
                    ? `https://image.tmdb.org/t/p/w200/${movie.backdrop_path}`
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/No_image_available_600_x_400.svg/2560px-No_image_available_600_x_400.svg.png"
                }
                alt={movie.title}
              />
              <p className={css.title}>{movie.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
export default MovieList;
