import tmdbApi from "./api";

export const fetchTrendingMovies = async () => {
  try {
    const response = await tmdbApi.get("/trending/movie/week");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};
