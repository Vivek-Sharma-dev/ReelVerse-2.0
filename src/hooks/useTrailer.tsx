import { useQuery } from "@tanstack/react-query";
import { fetchTrailer } from "../services/tmdb.service";

// fetch trailer
export const useTrailer = (id: number, type: string) => {
  return useQuery({
    queryKey: ["trailer", id, type],
    queryFn: () => fetchTrailer(id, type),
  });
};