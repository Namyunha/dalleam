import { getReviews, getScores } from './review';
import { QueryClient } from '@tanstack/react-query';
import { GatheringType, LocationType, SortType } from '@/types/gathering';
import { reviewQueryKeys, reviewScoresQueryKeys } from '@/types/review';
import { gatheringQueryKeys } from '@/types/gathering';
import { getGatherings } from './gathering';

const queryClient = new QueryClient();

export const useReviewPrefetchQuery = async () => {
  let queryKeys = {
    type: 'DALLAEMFIT' as GatheringType,
    location: '지역 선택' as LocationType,
    date: '날짜 선택',
    sortBy: '최신 순' as SortType,
  };
  let reviewQueryKeys: reviewQueryKeys = [['reviews'], queryKeys];
  let reviewScoresQueryKeys: reviewScoresQueryKeys = [['reviews', 'scores'], queryKeys];
  await Promise.all([
    queryClient.prefetchInfiniteQuery({
      queryKey: reviewQueryKeys,
      queryFn: ({ pageParam }) => getReviews({ pageParam }),
      initialPageParam: 0,
    }),
    queryClient.prefetchQuery({
      queryKey: reviewScoresQueryKeys,
      queryFn: () => getScores(),
    }),
  ]);
  return queryClient;
};

export const gatheringPrefetchQuery = async () => {
  let queryKeys = {
    type: 'DALLAEMFIT' as GatheringType,
    location: '지역 선택' as LocationType,
    date: '날짜 선택',
    sortBy: '마감 임박' as SortType,
  };
  let gatheringQueryKeys: gatheringQueryKeys = [['gathering'], queryKeys];
  await queryClient.prefetchInfiniteQuery({
    queryKey: gatheringQueryKeys,
    queryFn: ({ pageParam }) => getGatherings({ pageParam }),
    initialPageParam: 0,
  });
  return queryClient;
};
