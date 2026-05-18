import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchContentByGenre,
  fetchExploreContent,
  fetchHomeContentByGenre,
} from "../services/tmdb.service.ts";
import type { ContentFilter } from "../utils/constant.ts";

export const useGenreMovies = (
  movieId: number,
  tvId: number | null | undefined,
  filter: ContentFilter = {
    mediaType: "all",
    sortBy: "popularity.desc",
    includeAdult: false,
    year: "",
    rating: "",
  },
  category: string = "",
) => {
  return useQuery({
    queryKey: [
      "content",
      movieId,
      tvId,
      filter.mediaType,
      filter.sortBy,
      filter.includeAdult,
      filter.year,
      filter.rating,
      category
    ],
    queryFn: () => fetchContentByGenre(movieId, tvId, 1, filter, category),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export const useInfiniteGenreMovies = (
  movieId: number | null | undefined,
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
  category: string,
) => {
  return useInfiniteQuery({
    queryKey: [
      "infiniteMovies",
      movieId,
      tvId,
      filter.mediaType,
      filter.sortBy,
      filter.includeAdult,
      filter.year,
      filter.rating,
    ],
    queryFn: ({ pageParam = 1 }) =>
      fetchContentByGenre(movieId, tvId, pageParam, filter, category || ""),
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export const useInfinityExploreContent = (category: string, filter: ContentFilter) => {
  return useInfiniteQuery({
    queryKey: [
      "infiniteMovies",
      category,
      filter.mediaType,
      filter.sortBy,
      filter.includeAdult,
      filter.year,
      filter.rating,
    ],
    queryFn: ({ pageParam = 1 }) =>
      fetchExploreContent(category, pageParam, filter),
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
