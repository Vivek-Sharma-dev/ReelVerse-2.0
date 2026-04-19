import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { fetchMoviesByGenre } from "../services/tmdb.service.ts";

export const useGenreMovies = (genreId: number) => {
  return useQuery({
    queryKey: ["Movies", genreId],
    queryFn: () => fetchMoviesByGenre(genreId),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export const useInfiniteGenreMovies = (genreId: number) => {
  return useInfiniteQuery({
    queryKey: ["infiniteMovies", genreId],
    queryFn: ({ pageParam = 1 }) => fetchMoviesByGenre(genreId, pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
