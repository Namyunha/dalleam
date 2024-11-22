import {
  getGatheringParticipants,
  getGatherings,
  postGathering,
  getGatheringDetail,
  joinGathering,
  leaveGathering,
  cancelGathering,
  getJoinedGatherings,
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
    staleTime: Infinity,
  });
};

export const useJoinedGatheringInfiniteQuery = ({
  completed,
  reviewed,
  userId,
}: {
  completed?: boolean;
  reviewed?: boolean;
  userId?: number;
}) => {
  return useInfiniteQuery({
    queryKey: [['gathering'], { joined: userId }],
    queryFn: ({ pageParam = 0 }) => getJoinedGatherings({ pageParam, completed, reviewed }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length : undefined;
    },
    initialPageParam: 0,
    staleTime: Infinity,
  });
};

export const useMyGatheringInfiniteQuery = ({ userId }: { userId?: number }) => {
  return useInfiniteQuery({
    queryKey: [['gathering'], { createdBy: userId }],
    queryFn: ({ pageParam = 0 }) =>
      getGatherings({ pageParam, params: { limit: 10, createdBy: userId } }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length : undefined;
    },
    initialPageParam: 0,
    staleTime: Infinity,
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => joinGathering(id),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [['gathering'], { id }] }),
        queryClient.invalidateQueries({ queryKey: [['gathering', 'participants'], { id }] }),
      ]);
      toast('모임 참여 완료');
    },
  });
};

export const useGatheringLeavingMutation = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => leaveGathering(id),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [['gathering'], { id }] }),
        queryClient.invalidateQueries({ queryKey: [['gathering', 'participants'], { id }] }),
      ]);
      toast('모임 취소 완료');
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
    staleTime: 5 * 60 * 1000,
  });
};

export const useGatheringParticipantsQuery = (id: number) => {
  return useQuery({
    queryKey: [['gathering', 'participants'], { id }],
    queryFn: async () => getGatheringParticipants(id),
    staleTime: 5 * 60 * 1000,
  });
};
