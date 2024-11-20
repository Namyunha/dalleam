'use client';
import React from 'react';
import Image from 'next/image';
import useUserStore from '@/stores/userStore';
import DeadlineBadge from '@/app/_components/gatheringCard/DeadlineBadge';
import { useGatheringDetailQuery, useGatheringParticipantsQuery } from '@/services/gathering';
import GatheringInfo from '../_components/GatheringInfo';
import GatheringFooter from '../_components/GatheringFooter';
import GatheringReviewList from '../_components/GatheringReviewList';
import GatheringButton from '../_components/GatheringButton';

type Props = {
  params: {
    id: number;
  };
};

export default function GatheringDetail({ params }: Props) {
  const { user } = useUserStore();
  const gatheringId = Number(params.id);

  const { data: gatheringDetailData, isFetching: gatheringDetailIsFetching } =
    useGatheringDetailQuery(gatheringId);
  const { data: gatheringParticipantsData, isFetching: gatheringParticipantsIsFetching } =
    useGatheringParticipantsQuery(gatheringId);

  if (!gatheringDetailData || !gatheringParticipantsData) {
    return (
      <div className="w-full h-258pxr md:w-696pxr md:h-528pxr lg:w-996pxr lg:h-474pxr flex items-center justify-center">
        모임 정보가 존재하지 않습니다.
      </div>
    );
  }
  if (gatheringDetailIsFetching || gatheringParticipantsIsFetching) {
    return (
      <div className="w-full h-258pxr md:w-696pxr md:h-528pxr lg:w-996pxr lg:h-474pxr flex items-center justify-center">
        모임 정보를 불러오는 중입니다.
      </div>
    );
  }
  console.log(
    'gatheringParticipantsData - ',
    gatheringParticipantsData.map(({ userId }) => userId).includes(user?.id as number),
  );
  console.log('user?.id = ', user?.id);

  const buttonProps = {
    gatheringId,
    isJoined: gatheringParticipantsData.map(({ userId }) => userId).includes(user?.id as number),
    isFull: gatheringDetailData.capacity === gatheringDetailData.participantCount,
    userId: user?.id as number,
    hostId: gatheringDetailData.createdBy,
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
            <GatheringInfo
              gatheringDetails={gatheringDetailData}
              participants={gatheringParticipantsData}
            />
          </div>
          <div className="p-6 bg-white border-t-2 border-gray-200 border-solid space-y-10pxr lg:space-y-4 w-343pxr md:w-696pxr md:h-820pxr lg:w-996pxr lg:h-687pxr">
            <p className="text-base font-semibold text-left text-gray-900 md:text-lg ">
              이용자들은 이 프로그램을 이렇게 느꼈어요!
            </p>
            {/* 리뷰 데이터가 없으면 목록을 표시하지 않음 */}
            <GatheringReviewList gatheringId={gatheringId} />
          </div>
        </div>
      </div>
      <GatheringFooter isHosted={gatheringDetailData.createdBy === (user?.id as number)}>
        <GatheringButton {...buttonProps} />
      </GatheringFooter>
    </>
  );
}
