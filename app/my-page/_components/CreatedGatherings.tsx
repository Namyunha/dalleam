import React, { useEffect } from 'react';
import Card from '@/components/card/Card';
import { useMyGatheringInfiniteQuery } from '@/services/gathering';
import useModal from '@/hooks/useModal';
import { useInView } from 'react-intersection-observer';
import useUserStore from '@/stores/userStore';
import Modal from '@/components/Modal';
import GatheringReviewModal from '@/app/_components/gatheringReviewModal/GatheringReviewModal';

export default function CreatedGatherings() {
  const { modalRef, handleCloseModal } = useModal();
  const { ref, inView } = useInView();
  const { user } = useUserStore();
  const userId = user?.id;
  const { data, fetchNextPage, isFetching, hasNextPage } = useMyGatheringInfiniteQuery({
    userId,
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
            <span className="text-sm font-medium text-gray-500">아직 만든 모임이 없어요</span>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {data?.pages.flat().map((gathering) => {
              return <Card normal gathering={gathering} key={gathering.id} />;
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
