'use client';

import React from 'react';

import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import useModal from '@/hooks/useModal';
import { useParams } from '@/hooks/useParams';
import { useGatheringBtn } from '@/hooks/useGatheringBtn';
import clsx from 'clsx';
import Modal from '@/components/Modal';
import LoginAlert from '@/components/loginAlert/LoginAlert';

type Props = {
  gatheringId: number;
  isJoined: boolean;
  isFull: boolean;
  hostId: number;
  userId: number;
};

export default function GatheringButton({ gatheringId, isFull, hostId, isJoined, userId }: Props) {
  const router = useRouter();
  const { modalRef, handleOpenModal, handleCloseModal } = useModal();
  const { gatheringQueryKeys } = useParams({ isGathering: true });
  const {
    activateGathering: { joinMutate, leaveMutate, cancelMutate, handleShare },
    pendingGathering: { isJoining, isLeaving, isCanceling },
  } = useGatheringBtn({ gatheringId, back: router.back, gatheringQueryKeys });

  let content = '참여하기';
  let buttonState: 'full' | 'empty' = 'full';
  let clickEvent = () => (!userId ? handleOpenModal() : joinMutate());

  if (userId && hostId === userId) {
    clickEvent = () => cancelMutate();
    content = isCanceling ? '모임 취소중..' : '모임 취소하기';
  }
  if (!isJoined && !isFull) {
    clickEvent();
    content = isJoining ? '참여 요청중..' : '참여하기';
  }
  if (userId && isJoined) {
    clickEvent = () => leaveMutate();
    content = isLeaving ? '참여 취소중..' : '참여 취소하기';
  }

  return (
    <>
      <div className="space-x-2 flex">
        <Button
          onClick={clickEvent}
          fillState={buttonState}
          disabled={isFull ? true : false}
          variant={isFull ? 'gray' : undefined}
          className={clsx('text-sm  sm:w-1/2 md:w-[110px] h-[44px]')}
        >
          {content}
        </Button>
        {userId && hostId === userId && (
          <Button
            className="text-sm sm:w-1/2 md:w-[110px] h-[44px]"
            fillState="empty"
            onClick={handleShare}
          >
            공유하기
          </Button>
        )}
      </div>
      <Modal ref={modalRef}>
        <LoginAlert onClose={handleCloseModal} gatheringId={gatheringId} />
      </Modal>
    </>
  );
}
