import tmdbApi from "./api";

// ** Content fetching functions for TMDB API

// 1. Fetch trending movies of the week
export const fetchTrendingMovies = async () => {
  try {
    const response = await tmdbApi.get("/trending/movie/week");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

// 2. Fetch movies by genre
export const fetchMoviesByGenre = async (genreId: number, page: number = 1) => {
  try {
    const response = await tmdbApi.get("/discover/movie", {
      params: {
        with_genres: genreId,
        sort_by: "popularity.desc",
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    throw error;
  }
};

// ** fetching movie details, credits, similar movies, etc. can be added here as needed in the future
// fetch movie details
export const fetchMovieDetails = async (id: number, type: string) => {
  try {
    const response = await tmdbApi.get(`/${type}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

// fetch movie credits
export const fetchMovieCredits = async (id: number, type: string) => {
  try {
    const response = await tmdbApi.get(`/${type}/${id}/credits`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    throw error;
  }
};

// fetch similar movies
export const fetchSimilarMovies = async (id: number, type: string) => {
  try {
    const response = await tmdbApi.get(`/${type}/${id}/similar`);
    return response.data;
  } catch (error) {
    console.error("Error fetching similar movies:", error);
    throw error;
  }
};
