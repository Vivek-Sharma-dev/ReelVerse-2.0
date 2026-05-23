import { useQuery } from '@tanstack/react-query';
import { fetchPersonDetails } from '../services/tmdb.service';

// fetch person details like biography, filmography, and notable works and movies and tv shows where they have been cast
export const usePersonDetails = (id: number) => {
    return useQuery({
        queryKey: ['personDetails', id],
        queryFn: () => fetchPersonDetails(id),
        enabled: !!id, // Only run the query if id is truthy
        staleTime: 5 * 60 * 60, // 5 minutes
    })
}