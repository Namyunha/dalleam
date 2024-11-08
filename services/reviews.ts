import { reviewQueryKeys, reviewScoresQueryKeys, paramsType } from '@/types/review';
import { GatheringType } from '@/types/gathering';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getReviews, getScores, getGatheringReviews } from '@/api/review';

export const useReviewsInfiniteQuery = (queryKey: reviewQueryKeys, params: paramsType) => {
  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 0 }) => getReviews({ pageParam, params }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length : undefined;
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
  });
};

export const useScoresQuery = (queryKey: reviewScoresQueryKeys, typeTab: GatheringType) => {
  return useQuery({
    queryKey,
    queryFn: () => getScores(typeTab),
    staleTime: 5 * 60 * 1000,
  });
};

export const useGatheringReviewsQuery = (id: number) => {
  return useQuery({
    queryKey: [['reviews', 'gathering'], { id }],
    queryFn: () => getGatheringReviews(id),
  });
};
