import {
  reviewQueryKeys,
  reviewScoresQueryKeys,
  paramsType,
  GatheringReview,
} from '@/types/review';
import { GatheringType } from '@/types/gathering';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getReviews,
  getScores,
  getGatheringReviews,
  postReviews,
  getAvailableReviews,
} from '@/api/review';
import { toast } from '@/components/toast/ToastManager';
import { getQueryKeys } from '@/api/queryKeys';

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
  const { gatheringReviewQueryKeys } = getQueryKeys(false, id);
  return useQuery({
    queryKey: gatheringReviewQueryKeys,
    queryFn: () => getGatheringReviews(id),
  });
};

export const useReviewMutation = (review: GatheringReview, closeModal: () => void) => {
  const queryClient = useQueryClient();
  const { gatheringReviewQueryKeys } = getQueryKeys(false, review.gatheringId);
  return useMutation({
    mutationFn: async () => postReviews(review),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: gatheringReviewQueryKeys,
      });
      closeModal();
      toast('리뷰 등록 완료');
    },
  });
};

// export const useWrittenReviewsQuery = (userId: number) => {
//   return useInfiniteQuery({
//     queryKey: ['writtenReviews'],
//     queryFn: ({ pageParam }) => getReviews(userId, pageParam),
//     initialPageParam: 0,
//     enabled: false,
//     getNextPageParam: (lastPage, allPages) => {
//       if (lastPage.length < 5) {
//         return undefined;
//       }
//       return allPages.flat().length;
//     },
//   });
// };

export const useAvailableReviews = async () => {
  return useInfiniteQuery({
    queryKey: ['newReviews'],
    queryFn: ({ pageParam }) => getAvailableReviews(pageParam),
    initialPageParam: 0,
    enabled: false,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) {
        return undefined;
      }
      return allPages.flat().length;
    },
    staleTime: 1000 * 60 * 5,
  });
};
