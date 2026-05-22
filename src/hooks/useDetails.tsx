import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetails } from "../services/tmdb.service";

export const useMovieDetails = (movieId: number, type: string) => {
  return useQuery({
    queryKey: ["movieDetails", movieId, type],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 4000));
      return fetchMovieDetails(movieId, type);
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
