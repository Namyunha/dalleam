import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format, addHours } from 'date-fns';

import Person from '/public/icons/gathering/person.svg';
import Bye from '/public/icons/gathering/bye.svg';
import Stroke from '/public/icons/gathering/line.svg';
import useUserStore from '@/stores/userStore';

import Button from '../Button';
import ChipState from '../chip/ChipState';

import { Gathering } from '@/types/gathering';
import { formatDateTime, isDeadlinePassed } from '@/utils/gathering';
import useGatheringId from '@/stores/useGatheringId';
import useModalType from '@/stores/useModalType';
import useModal from '@/hooks/useModal';
import Modal from '../Modal';
import GatheringReviewModal from '@/app/_components/gatheringReviewModal/GatheringReviewModal';

type Props = {
  normal: boolean;
  gathering: Gathering;
  isReviewed?: boolean;
};

const Card = ({ normal, gathering, isReviewed }: Props) => {
  const { modalRef, handleOpenModal, handleCloseModal } = useModal();
  const { setId } = useGatheringId();
  const { setType } = useModalType();
  const { user } = useUserStore();

  const { formattedDate, formattedTime } = formatDateTime(gathering.dateTime) ?? {
    formattedDate: '',
    formattedTime: '',
  };

  new Date(gathering.dateTime);

  const isFinishedRegisterEnd = isDeadlinePassed(gathering.registrationEnd);
  const isFinishedDateTime = isDeadlinePassed(
    addHours(new Date(gathering.dateTime), 0).toDateString(),
  );

  // 개설확정 충족 조건
  const minParticipants = gathering.participantCount >= 5;

  return (
    <>
      <div className="relative flex flex-col gap-6 bg-white w-311pxr md:w-full md:max-w-948pxr">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative w-311pxr h-156pxr pt-1pxr pl-1pxr md:w-280pxr">
            <Link href={`/gatherings/${gathering.id}`}>
              <Image
                src={gathering.image || '/card-image2.png'}
                alt="Image"
                fill
                className="object-cover rounded-3xl"
                priority
              />
            </Link>
          </div>
          <div className="flex flex-col justify-between gap-18pxr">
            <div className="flex flex-col gap-3">
              {!normal && (
                <div className="flex items-center gap-2">
                  {isFinishedDateTime ? (
                    <ChipState status="이용 완료" />
                  ) : (
                    <>
                      <ChipState status="이용 예정" />
                      <ChipState status={minParticipants ? '개설 확정' : '개설 대기'} />
                    </>
                  )}
                </div>
              )}
              <div className="flex flex-col items-start gap-6pxr">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-gray-900">{gathering.type}</span>
                  <div className="flex items-center gap-2 w-76pxr h-7">
                    <span className="text-lg font-semibold text-gray-900">|</span>
                    <span className="text-sm font-medium text-gray-700">{gathering.location}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="text-sm text-gray-700">
                    <span className="font-medium" data-testid="format-date">
                      {formattedDate}
                    </span>
                    <span className="mx-1">·</span>
                    <span className="font-medium" data-testid="format-time">
                      {formattedTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Person className="size-4" />
                    <span className="text-sm font-medium text-gray-700">
                      {gathering.participantCount}/{gathering.capacity}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* 버튼 컴포넌트 */}
            {gathering.createdBy !== user?.id && (
              <Button
                size="sm"
                fillState="full"
                variant={`${isReviewed ? 'gray' : 'orange'}`}
                onClick={() => {
                  if (!isReviewed) {
                    setType('review');
                    handleOpenModal();
                    setId(gathering.id);
                  }
                }}
              >
                리뷰 작성하기
              </Button>
            )}
          </div>
        </div>
        <Stroke className="w-full" />

        {/* 오버레이 */}
        {gathering.canceledAt && (
          <div className="absolute top-0 left-0 h-[calc(100%-1.5rem)] px-91pxr py-81pxr flex items-center justify-center flex-col gap-6 w-full text-sm opacity-100 rounded-xl bg-black/80 md:flex-row md:h-full  md:rounded-3xl">
            <p className="h-10 text-sm font-medium text-center text-white w-132pxr">
              모집 취소된 모임이에요, 다음 기회에 만나요 🙏
            </p>
            <div className="flex items-center justify-center gap-2 px-3 py-6pxr rounded-xl bg-orange-50 md:flex md:absolute top-6 right-6 md:rounded-full md:size-12">
              <Bye />
              <span className="text-xs font-semibold text-orange-600 md:hidden">모임 보내주기</span>
            </div>
          </div>
        )}
      </div>
      <Modal ref={modalRef}>
        <GatheringReviewModal gatheringId={gathering.id} closeModal={handleCloseModal} />
      </Modal>
    </>
  );
};

export default Card;
