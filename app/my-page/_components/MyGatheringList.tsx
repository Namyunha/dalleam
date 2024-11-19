// MyGatheringList.tsx
'use client';

import React, { useEffect } from 'react';
import Modal from '@/components/Modal';
import GatheringReviewModal from '@/app/_components/gatheringReviewModal/GatheringReviewModal';
import { useInView } from 'react-intersection-observer';
import useUserStore from '@/stores/userStore';
import { useMyPageParams } from '@/hooks/useParams';
import { useMyPageFilterStore } from '@/stores/myPageFilterStore';
import JoinedReviews from './JoinedReviews';
import AvailableReview from './AvailableReview';
import WrittenReviews from './WrittenReviews';
import CreatedGatherings from './CreatedGatherings';
// 다른 import들...

export default function MyGatheringList() {
  const { user } = useUserStore();
  const userId = user?.id ?? 0;
  const { type, subTab } = useMyPageFilterStore();

  const {
    modalRef,
    handleCloseModal,
    handleOpenModal,
    data,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useMyPageParams({ userId });

  const { ref, inView } = useInView();
  console.log('data = ', data);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <>
      {type === 'joined' && <JoinedReviews data={data} handleOpenModal={handleOpenModal} />}
      {type === 'review' &&
        (subTab === 'available' ? (
          <AvailableReview data={data} handleOpenModal={handleOpenModal} />
        ) : (
          <WrittenReviews data={data} />
        ))}
      {type === 'createdBy' && <CreatedGatherings data={data} />}
      {!isFetching && hasNextPage && <div ref={ref}></div>}
      <Modal ref={modalRef}>
        <GatheringReviewModal closeModal={handleCloseModal} />
      </Modal>
    </>
  );
}
