import axios from "axios";

const api_key = "94a56077439b5f482a500ddd5c79f73f";

export const fetchPopularMovies = async () => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}&language=en-US`
  );
  return data.results;
};

export const fetchMoviesById = async (movie_id) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${api_key}&language=en-US`
  );
  return data;
};

export const fetchReviews = async (movieId) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${api_key}&language=en-US`
  );
  return data.results;
};

export const searchMovie = async (movie) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${movie}`
  );
  return data.results;
};

export const fetchActors = async (movieId) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${api_key}&language=en-US`
  );
  return data.cast;
};
