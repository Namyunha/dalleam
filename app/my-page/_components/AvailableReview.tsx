import React, { useEffect } from 'react';
import Card from '@/components/card/Card';
import { InfiniteData } from '@tanstack/react-query';
import { JoinedGathering } from '@/types/gathering';
import { useJoinedGatheringInfiniteQuery } from '@/services/gathering';
import { useInView } from 'react-intersection-observer';
import useModal from '@/hooks/useModal';
import useUserStore from '@/stores/userStore';
import Modal from '@/components/Modal';
import GatheringReviewModal from '@/app/_components/gatheringReviewModal/GatheringReviewModal';

export default function AvailableReview() {
  const { modalRef, handleOpenModal, handleCloseModal } = useModal();
  const { ref, inView } = useInView();
  const { user } = useUserStore();
  const userId = user?.id;
  const { data, fetchNextPage, isFetching, hasNextPage } = useJoinedGatheringInfiniteQuery({
    userId,
    reviewed: false,
  });
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <>
      <div className="flex justify-center min-h-[60vh] bg-white">
        {data?.pages[0].length === 0 ? (
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-500">
              아직 작성 가능한 리뷰가 없어요
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {data?.pages.map((page) =>
              page.map((review) => (
                <Card
                  openModal={handleOpenModal}
                  normal={false}
                  gathering={review}
                  key={review.id}
                />
              )),
            )}
          </div>
        )}
      </div>
      {!isFetching && hasNextPage && <div ref={ref}></div>}
      <Modal ref={modalRef}>
        <GatheringReviewModal closeModal={handleCloseModal} />
      </Modal>
    </>
  );
}
