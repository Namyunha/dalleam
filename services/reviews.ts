import {
  reviewQueryKeys,
  reviewScoresQueryKeys,
  paramsType,
  GatheringReview,
} from '@/types/review';
import { GatheringType } from '@/types/gathering';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getReviews, getScores, getGatheringReviews, postReviews } from '@/api/review';
import { toast } from '@/components/toast/ToastManager';

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

export const useReviewMutation = (review: GatheringReview, closeModal: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => postReviews(review),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [['reviews', 'gathering'], { id: review.gatheringId }],
      });
      closeModal();
      toast('리뷰 등록 완료');
    },
  });
};
