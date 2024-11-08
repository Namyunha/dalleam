'use client';
import React from 'react';
import Image from 'next/image';
import DeadlineBadge from '@/app/(list)/_components/gatheringCard/DeadlineBadge';
import GatheringDetailInfo from '../_components/GatheringDetailInfo';
import ActionButtons from '../_components/ActionButtons';
import GatheringReviewList from '../_components/GatheringReviewList';
import { useGatheringDetailQuery, useGatheringParticipantsQuery } from '@/services/gathering';
import { useGatheringReviewsQuery } from '@/services/reviews';

type Props = {
  params: {
    id: number;
  };
};

export default function GatheringDetail({ params }: Props) {
  const id = Number(params.id);

  const {
    status: gatheringDetailStatus,
    data: gatheringDetailData,
    error: gatheringDetailError,
    isFetching: gatheringDetailIsFetching,
  } = useGatheringDetailQuery(id);

  const {
    status: gatheringReviewsStatus,
    data: gatheringReviewsData,
    error: gatheringReviewsError,
    isFetching: gatheringReviewsIsFetching,
  } = useGatheringReviewsQuery(id);

  const {
    status: gatheringParticipantsStatus,
    data: gatheringParticipantsData,
    error: gatheringParticipantsError,
    isFetching: gatheringParticipantsIsFetching,
  } = useGatheringParticipantsQuery(id);

  console.log('gatheringDetailData = ', gatheringDetailData);
  console.log('reviewData = ', gatheringReviewsData);
  console.log('gatheringParticipantsData = ', gatheringParticipantsData);

  if (gatheringDetailStatus === 'error') {
    return (
      <div className="font-semibold text-red-500">
        <p>{gatheringDetailError.message}</p>
      </div>
    );
  }

  if (gatheringReviewsStatus === 'error') {
    return (
      <div className="font-semibold text-red-500">
        <p>{gatheringReviewsError.message}</p>
      </div>
    );
  }

  if (!gatheringParticipantsData) {
    return (
      <div className="w-full h-258pxr md:w-696pxr md:h-528pxr lg:w-996pxr lg:h-474pxr flex items-center justify-center">
        참여자 목록이 존재하지 않습니다.
      </div>
    );
  }

  if (!gatheringDetailData) {
    return (
      <div className="w-full h-258pxr md:w-696pxr md:h-528pxr lg:w-996pxr lg:h-474pxr flex items-center justify-center">
        모임 정보가 존재하지 않습니다.
      </div>
    );
  }

  const actionButtonProps = {
    isFull: gatheringDetailData.capacity === gatheringDetailData.participantCount,
    hostId: gatheringDetailData.createdBy,
    gatheringId: id,
    joinedGatheringIds: gatheringParticipantsData.map(({ userId }) => userId),
  };

  return (
    <>
      <div className="h-full px-4 pt-6 min-h-dvh bg-gray-50 max-w-1200pxr w-375pxr md:w-744pxr md:pl-6 md:pr-25pxr md:pt-46pxr lg:w-1200pxr lg:px-102pxr lg:pt-41pxr">
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative w-343pxr h-180pxr md:w-340pxr md:h-240pxr lg:w-486pxr lg:h-270pxr">
              <Image
                src={gatheringDetailData.image || '/card-image2.png'}
                alt={`참여할 수 있는 ${gatheringDetailData.type} 모임`}
                fill
                className="object-cover rounded-3xl"
                priority
              />
              <DeadlineBadge registrationEnd={gatheringDetailData.registrationEnd} />
            </div>
            <GatheringDetailInfo
              gatheringDetails={gatheringDetailData}
              participants={gatheringParticipantsData}
            />
          </div>
          <div className="p-6 bg-white border-t-2 border-gray-200 border-solid space-y-10pxr lg:space-y-4 w-343pxr md:w-696pxr md:h-820pxr lg:w-996pxr lg:h-687pxr">
            <p className="text-base font-semibold text-left text-gray-900 md:text-lg ">
              이용자들은 이 프로그램을 이렇게 느꼈어요!
            </p>
            {/* 리뷰 데이터가 없으면 목록을 표시하지 않음 */}
            {gatheringReviewsData && gatheringReviewsData?.length > 0 ? (
              <GatheringReviewList reviews={gatheringReviewsData} />
            ) : (
              <div className="flex items-center justify-center h-full min-h-500pxr md:min-h-696pxr">
                <div className="w-full h-258pxr md:w-696pxr md:h-528pxr lg:w-996pxr lg:h-474pxr flex items-center justify-center">
                  아직 리뷰가 없어요
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ActionButtons {...actionButtonProps} />
    </>
  );
}
