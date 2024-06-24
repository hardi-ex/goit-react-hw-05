import css from "./MovieReviews.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../../service/api";

export const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getReviews = async () => {
      try {
        const data = await fetchReviews(movieId);
        setReviews(data);
      } catch (error) {
        setError(error.message);
      }
    };
    getReviews();
  }, [movieId]);

  return (
    <div>
      {reviews?.length === 0 && (
        <p className={css.title}>We don't have any reviews for this movie</p>
      )}
      {reviews?.length > 0 && (
        <ul className={css.ul}>
          {reviews.map((review) => (
            <li key={review.id}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};
export default MovieReviews;
