import React from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { gatheringReviewSchema } from '@/constants/formSchema';

type Props = {
  register: UseFormRegister<gatheringReviewSchema>;
  setValue: UseFormSetValue<gatheringReviewSchema>;
};

export default function GatheringReviewComment({ register, setValue }: Props) {
  let timer: ReturnType<typeof setTimeout>;
  const debounce = (callback: () => void) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(callback, 400);
  };

  return (
    <div className="flex flex-col gap-3">
      <span className="text-base font-semibold text-gray-800">경험에 대해 남겨주세요.</span>
      <textarea
        onChange={(e) => {
          debounce(() => setValue('comment', e.target.value));
        }}
        style={{ resize: 'none' }}
        placeholder="남겨주신 리뷰는 프로그램 운영 및 다른 회원 분들께 큰 도움이 됩니다."
        className="w-full h-120pxr px-2.5 py-4 bg-gray-50 rounded-xl placeholder-gray-400 outline-none"
      />
      <input
        {...register('comment', {
          required: '리뷰를 입력해주세요',
        })}
        type="hidden"
      />
    </div>
  );
}
