import React, { useState } from 'react';
import EmptyHeart from '/public/icons/reviewEmptyHeart.svg';
import FillHeart from '/public/icons/reviewFillHeart.svg';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { gatheringReviewSchema } from '@/constants/formSchema';
import { useEffect } from 'react';

type Props = {
  register: UseFormRegister<gatheringReviewSchema>;
  setValue: UseFormSetValue<gatheringReviewSchema>;
};

export default function GatheringScores({ register, setValue }: Props) {
  const [paintable, setPaintable] = useState(true);
  const [score, setScore] = useState(0);
  const setScoreValue = (score: number) => {
    setScore(score);
    setValue('score', score);
  };

  useEffect(() => {
    setPaintable(true);
    setScoreValue(0);
    return () => {
      setScoreValue(0);
    };
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <span className="text-base font-semibold text-gray-800">만족스러운 경험이었나요?</span>
      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div
            key={idx}
            onClick={() => {
              setScoreValue(idx + 1);
              score > 0 ? setPaintable(false) : setPaintable(true);
            }}
            onMouseEnter={() => paintable && setScore(idx + 1)}
            onMouseLeave={() => {
              paintable ? setScoreValue(0) : score === 0 && setScoreValue(idx + 1);
            }}
            className="relative size-6"
          >
            {score > idx ? (
              <FillHeart className="absolute cursor-pointer" />
            ) : (
              <EmptyHeart className="absolute cursor-pointer" />
            )}
          </div>
        ))}
      </div>
      <input
        value={score}
        type="hidden"
        {...register('score', {
          required: '점수를 매겨 주세요',
          min: { value: 1, message: '점수를 매겨 주세요' },
        })}
      />
    </div>
  );
}
