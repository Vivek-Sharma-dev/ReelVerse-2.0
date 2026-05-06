import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchContentByGenre,
  fetchMoviesByGenre,
} from "../services/tmdb.service.ts";

export const useGenreMovies = (
  movieId: number,
  tvId: number | null | undefined,
) => {
  return useQuery({
    queryKey: ["content", movieId, tvId],
    queryFn: () => fetchContentByGenre(movieId, tvId),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export const useInfiniteGenreMovies = (
  movieId: number,
  tvId: number | null | undefined,
) => {
  return useInfiniteQuery({
    queryKey: ["infiniteMovies", movieId, tvId],
    queryFn: ({ pageParam = 1 }) =>
      fetchContentByGenre(movieId, tvId, pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
