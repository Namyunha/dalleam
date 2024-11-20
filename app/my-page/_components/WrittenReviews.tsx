import React, { useEffect } from 'react';
import ReviewCard from '@/components/card/ReviewCard';
import { useReviewsInfiniteQuery } from '@/services/reviews';
import { useInView } from 'react-intersection-observer';
import useModal from '@/hooks/useModal';
import useUserStore from '@/stores/userStore';
import Modal from '@/components/Modal';
import GatheringReviewModal from '@/app/_components/gatheringReviewModal/GatheringReviewModal';

export default function WrittenReviews() {
  const { modalRef, handleCloseModal } = useModal();
  const { ref, inView } = useInView();
  const { user } = useUserStore();
  const userId = user?.id;
  const { data, fetchNextPage, isFetching, hasNextPage } = useReviewsInfiniteQuery(
    [['reviews'], { userId }],
    { userId, limit: 10 },
  );
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
            <span className="text-sm font-medium text-gray-500">아직 작성한 리뷰가 없어요</span>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-6">
            {data?.pages.flat().map((review, i) => {
              return <ReviewCard key={i} {...review} isMyPage />;
            })}
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
