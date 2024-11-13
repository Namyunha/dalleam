import { toast } from '@/components/toast/ToastManager';
import {
  useGatheringCancelingMutation,
  useGatheringJoinMutation,
  useGatheringLeavingMutation,
} from '@/services/gathering';
import { gatheringQueryKeys } from '@/types/gathering';

type Props = {
  gatheringId: number;
  back: () => void;
  gatheringQueryKeys: gatheringQueryKeys;
};

export const useGatheringBtn = ({ gatheringId, back, gatheringQueryKeys }: Props) => {
  const { mutate: joinMutate, isPending: isJoining } = useGatheringJoinMutation(gatheringId);
  const { mutate: leaveMutate, isPending: isLeaving } = useGatheringLeavingMutation(gatheringId);
  const { mutate: cancelMutate, isPending: isCanceling } = useGatheringCancelingMutation(
    gatheringId,
    gatheringQueryKeys,
    back,
  );

  const handleShare = () => {
    const shareableLink = `${window.location.origin}/gatherings/${gatheringId}`;
    navigator.clipboard
      .writeText(shareableLink)
      .then(() => {
        toast('링크가 클립보드에 복사되었습니다!');
      })
      .catch((err) => {
        console.error('클립보드 복사 실패:', err);
      });
  };

  const activateGathering = { joinMutate, leaveMutate, cancelMutate, handleShare };
  const pendingGathering = { isJoining, isLeaving, isCanceling };

  return { activateGathering, pendingGathering };
};
