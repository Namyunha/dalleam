'use client';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useJoinedGatheringInfiniteQuery } from '@/services/gathering';
import useModal from '@/hooks/useModal';
import Modal from '@/components/Modal';
import GatheringReviewModal from '@/app/_components/gatheringReviewModal/GatheringReviewModal';
import Card from '@/components/card/Card';
import MyProfile from './Myprofile';
import MyGatheringTab from './MyGatheringTab';

export default function MyGatherings() {
  const { ref, inView } = useInView();
  const { modalRef, handleCloseModal, handleOpenModal } = useModal();
  const {
    data: gatheringJoined,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useJoinedGatheringInfiniteQuery();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <div className="w-347pxr md:w-700pxr lg:w-996pxr gap-4 lg:gap-30pxr">
        <MyProfile />
        <div className="flex flex-col px-4 md:px-6 py-6 border-t-2 border-gray-900 bg-white">
          <MyGatheringTab />
          <div className="pt-6 min-h-[60vh] flex justify-center ">
            {gatheringJoined?.pages.flat().length === 0 ? (
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-500">신청한 모임이 아직 없어요</span>
              </div>
            ) : (
              <div aria-label="gatheringJoined" className="flex flex-col gap-6">
                {gatheringJoined?.pages.flat().map((myGathering) => {
                  return (
                    <Card
                      normal={false}
                      gathering={myGathering}
                      key={myGathering.id}
                      openModal={handleOpenModal}
                      isReviewed={myGathering.isReviewed}
                    />
                  );
                })}
              </div>
            )}
          </div>
          {!isFetching && hasNextPage && <div ref={ref}></div>}
        </div>
      </div>

      <Modal ref={modalRef}>
        <GatheringReviewModal closeModal={handleCloseModal} />
      </Modal>
    </>
  );
}
