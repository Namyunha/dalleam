import { getGatherings, postGathering } from '@/api/gathering';
import { toast } from '@/components/toast/ToastManager';
import { gatheringQueryKeys, savedGatheringQueryKeys } from '@/types/gathering';
import { paramsType } from '@/types/review';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useGatheringInfiniteQuery = (
  queryKey: gatheringQueryKeys | savedGatheringQueryKeys,
  params: paramsType,
) => {
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

export const useGatheringMutate = (
  queryKey: gatheringQueryKeys | savedGatheringQueryKeys,
  onClose: () => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postGathering,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
      toast('모임이 생성되었습니다.');
      onClose();
    },
  });
};
