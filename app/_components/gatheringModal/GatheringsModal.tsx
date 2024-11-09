'use client';

import React from 'react';
import GatheringCalendar from './GatheringCalendar';
import Button from '@/components/Button';
import GatheringImg from './GatheringImg';
import GatheringService from './GatheringService';
import { SubmitHandler, useForm } from 'react-hook-form';
import GatheringLocation from './GatheringLocation';
import { gatheringSchema } from '@/constants/formSchema';
import CloseIcon from '@/public/icons/gathering/close.svg';
import useFilterStore from '@/stores/filterStore';
import { useGatheringMutate } from '@/services/gathering';
import { useParams } from '@/hooks/useParams';

export default function GatheringModal({ onClose }: { onClose: () => void }) {
  const { gatheringQueryKeys } = useParams({ isGathering: true });
  const { mutate } = useGatheringMutate(gatheringQueryKeys, onClose);
  const { resetFilters } = useFilterStore();
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<gatheringSchema>({ defaultValues: { capacity: 5 } });

  const onSubmitHandler: SubmitHandler<gatheringSchema> = async (gathering) => {
    await mutate({ gathering });
    resetFilters();
  };

  return (
    <div
      data-cy="modal"
      className="scrollbar w-dvw h-dvh md:h-[96vh] lg:h-[100vh] md:w-520pxr px-4 pt-6 pb-3 md:pb-6 md:px-6 bg-white overflow-auto flex flex-col"
    >
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="w-full flex-grow flex flex-col gap-6"
      >
        <div className="w-full flex justify-between">
          <span className="text-lg font-semibold">모임만들기</span>
          <span className="cursor-pointer" onClick={() => onClose()}>
            <CloseIcon />
          </span>
        </div>
        <GatheringLocation control={control} />
        <GatheringImg control={control} />
        <GatheringService control={control} />
        <GatheringCalendar control={control} />
        <div className="w-full mt-auto">
          <Button
            type="submit"
            className="w-full h-10 min-h-10"
            variant={isValid ? 'orange' : 'invalidate'}
            fillState="full"
          >
            확인
          </Button>
        </div>
      </form>
    </div>
  );
}
