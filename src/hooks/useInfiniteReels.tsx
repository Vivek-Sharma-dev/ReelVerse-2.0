import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchTrailerData } from "../services/tmdb.service";


// ** Content fetching functions for TMDB API for INFINITE SCROLL TRAILERS
export const useInfiniteReels = () => {
  return useInfiniteQuery({
    queryKey: ["infiniteReelsUnified"],
    queryFn: async ({ pageParam = 1 }) => {
      const results = await fetchTrailerData(pageParam);
      return {
        results,
        page: pageParam,
        total_pages: 500,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    staleTime: 5 * 60 * 60, // 5 minutes
  });
};
