import React from 'react';
import Image from 'next/image';
import { fetchDetailGathering, fetchDetailReviews, fetchJoinedGatheringIds } from '@/lib/data';
import { mockGatheringReviews } from '@/lib/placeholder-data';
import DeadlineBadge from '@/app/(list)/_components/gatheringCard/DeadlineBadge';
import GatheringDetailInfo from '../_components/GatheringDetailInfo';
import ActionButtons from '../_components/ActionButtons';
import ReviewDetailCardList from '../_components/ReviewDetailCardList';

type Props = {
  params: {
    id: number;
  };
};

const GatheringDetail = async ({ params }: Props) => {
  const id = Number(params.id);
  const { data: gatheringData, errorMessage: gatheringErrorMessage } =
    await fetchDetailGathering(id);
  const { data: reviewData, errorMessage: reviewErrorMessage } = await fetchDetailReviews(id);
  const { data: joinedGathering, errorMessage } = await fetchJoinedGatheringIds(id);

  if (gatheringErrorMessage) {
    return (
      <div className="font-semibold text-red-500">
        <p>{gatheringErrorMessage}</p>
      </div>
    );
  }

  if (reviewErrorMessage) {
    return (
      <div className="font-semibold text-red-500">
        <p>{reviewErrorMessage}</p>
      </div>
    );
  }

  if (!joinedGathering) {
    return <p>참여자 목록이 존재하지 않습니다.</p>;
  }

  if (!gatheringData) {
    return <p>모임 정보가 존재하지 않습니다.</p>;
  }

  const actionButtonProps = {
    isFull: gatheringData.capacity === gatheringData.participantCount,
    hostId: gatheringData.createdBy,
    gatheringId: id,
    joinedGatheringIds: joinedGathering.map(({ userId }) => userId),
  };

  return (
    <>
      <div className="h-full px-4 pt-6 min-h-dvh bg-gray-50 max-w-1200pxr w-375pxr md:w-744pxr md:pl-6 md:pr-25pxr md:pt-46pxr lg:w-1200pxr lg:px-102pxr lg:pt-41pxr">
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative w-343pxr h-180pxr md:w-340pxr md:h-240pxr lg:w-486pxr lg:h-270pxr">
              <Image
                src={gatheringData.image || '/card-image2.png'}
                alt={`참여할 수 있는 ${gatheringData.type} 모임`}
                fill
                className="object-cover rounded-3xl"
                priority
              />
              <DeadlineBadge registrationEnd={gatheringData.registrationEnd} />
            </div>
            <GatheringDetailInfo gatheringDetails={gatheringData} participants={joinedGathering} />
          </div>
          <div className="p-6 bg-white border-t-2 border-gray-200 border-solid space-y-10pxr lg:space-y-4 w-343pxr md:w-696pxr md:h-820pxr lg:w-996pxr lg:h-687pxr">
            <p className="text-base font-semibold text-left text-gray-900 md:text-lg ">
              이용자들은 이 프로그램을 이렇게 느꼈어요!
            </p>
            {/* 리뷰 데이터가 없으면 목록을 표시하지 않음 */}
            {reviewData ? (
              <ReviewDetailCardList reviews={mockGatheringReviews} />
            ) : (
              <div className="flex items-center justify-center h-full min-h-500pxr md:min-h-696pxr">
                <p className="h-10 text-sm font-medium text-center text-gray-500">
                  아직 리뷰가 없어요
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <ActionButtons {...actionButtonProps} />
    </>
  );
};

export default GatheringDetail;
