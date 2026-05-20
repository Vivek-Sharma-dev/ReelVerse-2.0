import { useQuery } from '@tanstack/react-query';
import { fetchPersonDetails } from '../services/tmdb.service';

export const usePersonDetails = (id: number) => {
    return useQuery({
        queryKey: ['personDetails', id],
        queryFn: () => fetchPersonDetails(id),
        enabled: !!id, // Only run the query if id is truthy
        staleTime: 5 * 60 * 60, // 5 minutes
    })
}