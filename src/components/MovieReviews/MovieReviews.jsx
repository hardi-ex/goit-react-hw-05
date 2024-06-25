import css from "./MovieReviews.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../../service/api";
import { MagnifyingGlass } from "react-loader-spinner";

export const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getReviews = async () => {
      setLoading(true);
      try {
        const data = await fetchReviews(movieId);
        setReviews(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getReviews();
  }, [movieId]);

  return (
    <div>
      {loading ? (
        <div className={css.loaderContainer}>
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
        <>
          {reviews?.length === 0 && (
            <p className={css.title}>
              We don't have any reviews for this movie
            </p>
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
        </>
      )}
    </div>
  );
};
export default MovieReviews;
