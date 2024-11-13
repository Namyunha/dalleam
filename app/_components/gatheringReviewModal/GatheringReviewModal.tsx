'use client';
import React, { useEffect } from 'react';
import Button from '@/components/Button';
import Delete from '/public/icons/delete.svg';
import GatheringScores from './GatheringScores';
import GatheringReviewComment from './GatheringReviewComment';
import { SubmitHandler, useForm } from 'react-hook-form';
import { gatheringReviewSchema } from '@/constants/formSchema';
import { toast } from '@/components/toast/ToastManager';
import { useReviewMutation } from '@/services/reviews';

type Props = {
  gatheringId?: number;
  closeModal: () => void;
};

export default function GatheringReviewModal({ closeModal, gatheringId = 0 }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<gatheringReviewSchema>();

  const mutation = useReviewMutation(
    { gatheringId, score: watch('score'), comment: watch('comment') },
    closeModal,
  );
  const { comment, score } = errors;

  useEffect(() => {
    if (comment?.message) {
      toast(comment.message);
      return;
    } else if (score?.message) {
      toast(score.message);
      return;
    }
  }, [comment, score]);

  const onReviewSubmit: SubmitHandler<gatheringReviewSchema> = () => mutation.mutate();

  return (
    <form
      onSubmit={handleSubmit(onReviewSubmit)}
      className="w-343pxr h-408pxr md:w-520pxr p-6 rounded-xl flex flex-col gap-6 bg-white"
    >
      <div className="flex justify-between">
        <span className="text-lg font-semibold text-gray-900">리뷰 쓰기</span>
        <Delete aria-label="deleteIcon" onClick={closeModal} className="cursor-pointer" />
      </div>
      <GatheringScores setValue={setValue} register={register} />
      <GatheringReviewComment setValue={setValue} register={register} />
      <div className="w-full flex gap-4">
        <Button
          className="w-full flex justify-center items-center "
          fillState="empty"
          variant="orange"
          onClick={closeModal}
        >
          취소
        </Button>
        <Button type="submit" className="w-full flex justify-center items-center " fillState="full">
          리뷰 등록
        </Button>
      </div>
    </form>
  );
}
