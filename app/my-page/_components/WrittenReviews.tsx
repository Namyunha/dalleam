import React from 'react';
import ReviewCard from '@/components/card/ReviewCard';
import { InfiniteData } from '@tanstack/react-query';
import { Review } from '@/types/review';

export default function WrittenReviews({ data }: { data?: InfiniteData<any> }) {
  return (
    <div className="flex justify-center min-h-[60vh] bg-white">
      {!data ? (
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-500">아직 작성한 리뷰가 없어요</span>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-6">
          {data.pages.flat().map((review, i) => {
            return <ReviewCard key={i} {...review} isMyPage />;
          })}
        </div>
      )}
    </div>
  );
}
