import { useQuery } from "@tanstack/react-query";
import { fetchTrendingMovies } from "../services/tmdb.service";
import type { MovieProps } from "../utils/types/movie.type";

// ** Fetch trending movies of the week
export const useTrendingMovies = () => {
  return useQuery<MovieProps[]>({
    queryKey: ["trendingMovies"],
    queryFn: () => fetchTrendingMovies(),
    staleTime: 5 * 60 * 60, // 5 minutes
  });
};
