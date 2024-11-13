import {
  getGatheringParticipants,
  getGatherings,
  postGathering,
  getGatheringDetail,
  joinGathering,
  leaveGathering,
  cancelGathering,
} from '@/api/gathering';
import { toast } from '@/components/toast/ToastManager';
import { Gathering, gatheringQueryKeys, savedGatheringQueryKeys } from '@/types/gathering';
import { paramsType } from '@/types/review';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const gatGatheringDetailKeys = (id: number) => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: [['gathering'], { id }] });
  queryClient.invalidateQueries({ queryKey: [['gathering', 'participants'], { id }] });
};

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

export const useGatheringJoinMutation = (id: number) => {
  return useMutation({
    mutationFn: async () => joinGathering(id),
    onSuccess: () => {
      toast('모임 참여 완료');
      gatGatheringDetailKeys(id);
    },
  });
};

export const useGatheringLeavingMutation = (id: number) => {
  return useMutation({
    mutationFn: async () => leaveGathering(id),
    onSuccess: () => {
      toast('참여 취소 완료');
      gatGatheringDetailKeys(id);
    },
  });
};

export const useGatheringCancelingMutation = (
  id: number,
  queryKey: gatheringQueryKeys,
  back: () => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => cancelGathering(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
      toast('모임 취소 완료');
      back();
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
