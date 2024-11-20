import React, { useEffect } from 'react';
import Card from '@/components/card/Card';
import { useJoinedGatheringInfiniteQuery } from '@/services/gathering';
import useUserStore from '@/stores/userStore';
import useModal from '@/hooks/useModal';
import Modal from '@/components/Modal';
import GatheringReviewModal from '@/app/_components/gatheringReviewModal/GatheringReviewModal';
import { useInView } from 'react-intersection-observer';

export default function JoinedReviews() {
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
      <div className="pt-6 min-h-[60vh] flex justify-center">
        {data?.pages[0].length === 0 ? (
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-500">신청한 모임이 아직 없어요</span>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {data?.pages.map((page, pageIndex) =>
              page.map((gathering) => (
                <Card
                  normal={false}
                  gathering={gathering}
                  key={`${pageIndex}-${gathering.id}`} // 고유한 키 생성
                  openModal={() => handleOpenModal()}
                  isReviewed={gathering.isReviewed}
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
