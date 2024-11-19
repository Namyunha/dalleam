import React from 'react';
import Card from '@/components/card/Card';
import { InfiniteData } from '@tanstack/react-query';
import { JoinedGathering } from '@/types/gathering';

type Props = {
  data?: InfiniteData<JoinedGathering>;
  handleOpenModal: () => void;
};

export default function AvailableReview({ data, handleOpenModal }: Props) {
  return (
    <>
      <div className="flex justify-center min-h-[60vh] bg-white">
        {!data ? (
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-500">
              아직 작성 가능한 리뷰가 없어요
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {data.pages.map((review) => {
              return (
                <Card
                  openModal={handleOpenModal}
                  normal={false}
                  gathering={review}
                  key={review.id}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
