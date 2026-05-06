import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchContentByGenre,
  fetchHomeContentByGenre,
} from "../services/tmdb.service.ts";

export const useGenreMovies = (
  movieId: number,
  tvId: number | null | undefined,
  filter: {
    mediaType: string;
    sortBy: string;
    includeAdult: boolean;
    year: string;
    rating: string;
  } = {
    mediaType: "all",
    sortBy: "popularity.desc",
    includeAdult: false,
    year: "",
    rating: "",
  },
) => {
  return useQuery({
    queryKey: ["content", movieId, tvId],
    queryFn: () => fetchHomeContentByGenre(movieId, tvId, 1),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export const useInfiniteGenreMovies = (
  movieId: number,
  tvId: number | null | undefined,
  filter: {
    mediaType: string;
    sortBy: string;
    includeAdult: boolean;
    year: string;
    rating: string;
  } = {
    mediaType: "all",
    sortBy: "popularity.desc",
    includeAdult: false,
    year: "",
    rating: "",
  },
 
) => {
  return useInfiniteQuery({
    queryKey: ["infiniteMovies", movieId, tvId, filter.mediaType],
    queryFn: ({ pageParam = 1 }) =>
      fetchContentByGenre(movieId, tvId, pageParam, filter),
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
