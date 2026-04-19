import { useQuery } from "@tanstack/react-query";
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
} from "../services/tmdb.service";
import type {
  CreditsResponse,
  ContentDetailsProps,
} from "../utils/types/card.type";

export const useMovieDetails = (movieId: number, type: string) => {
  return useQuery({
    queryKey: ["movieDetails", type, movieId], // unique key for caching
    queryFn: async () => {
      const [details, credits, similarMovies]: [
        details: ContentDetailsProps,
        credits: CreditsResponse,
        similarMovies: { results: ContentDetailsProps[] },
      ] = await Promise.all([
        fetchMovieDetails(movieId, type), // fetch movie details
        fetchMovieCredits(movieId, type), // fetch credits first to get director and main cast
        fetchSimilarMovies(movieId, type), // fetch similar movies
      ]);
      return { details, credits, similarMovies }; // return all data together for easier consumption in the component
    },
  });
};
