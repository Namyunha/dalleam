import { reviewQueryKeys, reviewScoresQueryKeys, paramsType } from '@/types/review';
import { GatheringType } from '@/types/gathering';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import useFilterStore from '@/stores/filterStore';
import { getReviews, getScores } from '@/api/review';

export const getParams = () => {
  const { type, location, date, reviewSortBy } = useFilterStore();
  let convertSortUrl: 'createdAt' | 'score' | 'participantCount' = 'createdAt';
  let queryKeys = { type, location, date, sortBy: reviewSortBy };
  switch (reviewSortBy) {
    case '최신 순':
      convertSortUrl = 'createdAt';
      break;
    case '리뷰 높은 순':
      convertSortUrl = 'score';
      break;
    case '참여 인원 순':
      convertSortUrl = 'participantCount';
      break;
  }
  let reviewQueryKeys: reviewQueryKeys = [['reviews'], queryKeys];
  let reviewScoresQueryKeys: reviewScoresQueryKeys = [['reviews', 'scores'], queryKeys];
  let params: paramsType = {
    type,
    sortOrder: 'desc',
    location: location === '지역 선택' ? undefined : location,
    date: date === '날짜 선택' ? undefined : date,
    sortBy: convertSortUrl,
  };

  return { params, reviewQueryKeys, reviewScoresQueryKeys };
};

export const useReviewsInfiniteQuery = (queryKey: reviewQueryKeys, params: paramsType) => {
  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 0 }) => getReviews({ pageParam, params }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 3 ? allPages.length : undefined;
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
