import { getGatherings } from '@/api/gathering';
import { gatheringQueryKeys } from '@/types/gathering';
import { paramsType } from '@/types/review';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGatheringInfiniteQuery = (queryKey: gatheringQueryKeys, params: paramsType) => {
  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 0 }) => getGatherings({ pageParam, params }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length : undefined;
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
  });
};
