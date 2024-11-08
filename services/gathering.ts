import {
  getGatheringParticipants,
  getGatherings,
  postGathering,
  getGatheringDetail,
} from '@/api/gathering';
import { toast } from '@/components/toast/ToastManager';
import { Gathering, gatheringQueryKeys, savedGatheringQueryKeys } from '@/types/gathering';
import { paramsType } from '@/types/review';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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

export const useGatheringDetailQuery = (id: number) => {
  return useQuery({
    queryKey: [['gathering'], { id }],
    queryFn: async (): Promise<Gathering> => await getGatheringDetail(id),
  });
};

export const useGatheringParticipantsQuery = (id: number) => {
  return useQuery({
    queryKey: [['gathering', 'participants'], { id }],
    queryFn: async () => getGatheringParticipants(id),
  });
};
