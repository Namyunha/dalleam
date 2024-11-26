'use client';

import React from 'react';

import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import useModal from '@/hooks/useModal';
import { useParams } from '@/hooks/useParams';
import { useGatheringBtn } from '@/hooks/useGatheringBtn';
import Modal from '@/components/Modal';
import LoginAlert from '@/components/loginAlert/LoginAlert';
import GatheringReviewModal from '@/app/_components/gatheringReviewModal/GatheringReviewModal';
import { useQueryClient } from '@tanstack/react-query';
import { Review } from '@/types/review';
import clsx from 'clsx';

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
  const queryClient = useQueryClient();
  const queryKey = [['reviews', 'gathering'], { id: gatheringId }];
  const query = queryClient.getQueryData(queryKey) as Review[];
  const reviewedUser = query?.find((el) => el.User.id === userId);
  console.log('reviewedUser = ', !reviewedUser);
  const {
    activateGathering: { joinMutate, leaveMutate, cancelMutate, handleShare },
    pendingGathering: { isJoining, isLeaving, isCanceling },
  } = useGatheringBtn({ gatheringId, back: router.back, gatheringQueryKeys });

  let content = isJoining ? '모임 참여중..' : '모임 참여하기';
  let subContent = '공유하기';
  let buttonState: 'full' | 'empty' = 'full';
  let clickEvent = !userId ? handleOpenModal : joinMutate;
  let subClickEvent = handleShare;
  let buttonActivate = isFull && !isJoined && hostId !== userId;

  if (hostId === userId) {
    clickEvent = cancelMutate;
    content = isCanceling ? '모임 취소중..' : '모임 취소하기';
  }
  if (hostId !== userId && isJoined) {
    clickEvent = leaveMutate;
    subClickEvent = handleOpenModal;
    content = isLeaving ? '참여 취소중..' : '참여 취소하기';
    subContent = '리뷰 쓰기';
  }

  return (
    <>
      <div className="space-x-2 flex">
        <Button
          className={clsx(
            'text-sm sm:w-1/2 md:w-[110px] h-[44px]',
            buttonActivate ? 'cursor-not-allowed hover:brightness-100' : 'cursor-pointer',
          )}
          fillState={buttonState}
          onClick={() => clickEvent()}
          disabled={buttonActivate ? true : false}
          variant={buttonActivate ? 'gray' : 'orange'}
        >
          {content}
        </Button>
        <Button
          className={clsx(
            'text-sm sm:w-1/2 md:w-[110px] h-[44px]',
            reviewedUser ? 'cursor-not-allowed hover:brightness-100' : 'cursor-pointer',
          )}
          fillState="empty"
          onClick={() => subClickEvent()}
          disabled={!!reviewedUser}
          variant={reviewedUser ? 'gray' : 'orange'}
        >
          {subContent}
        </Button>
      </div>
      <Modal ref={modalRef}>
        {hostId !== userId && isJoined ? (
          <GatheringReviewModal gatheringId={gatheringId} closeModal={handleCloseModal} />
        ) : (
          <LoginAlert onClose={handleCloseModal} gatheringId={gatheringId} />
        )}
      </Modal>
    </>
  );
}
