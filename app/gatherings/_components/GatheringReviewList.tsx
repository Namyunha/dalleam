'use client';

import React, { useState } from 'react';
import GatheringReview from './GatheringReview';
import GatheringPagination from './GatheringPagination';
import { useGatheringReviewsQuery } from '@/services/reviews';

const REVIEWS_PER_PAGE = 3;

export default function GatheringReviewList({ gatheringId }: { gatheringId: number }) {
  const { status, data, error, isFetching } = useGatheringReviewsQuery(gatheringId);
  // 항상 useState는 최상위에서 호출되어야 함
  const [currentPage, setCurrentPage] = useState(1);

  if (!data?.length) {
    return (
      <div className="flex items-center justify-center h-full min-h-500pxr md:min-h-696pxr">
        <div className="w-full h-258pxr md:w-696pxr md:h-528pxr lg:w-996pxr lg:h-474pxr flex items-center justify-center">
          아직 리뷰가 없어요
        </div>
      </div>
    );
  }

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-full min-h-500pxr md:min-h-696pxr">
        <div className="w-full h-258pxr md:w-696pxr md:h-528pxr lg:w-996pxr lg:h-474pxr flex items-center justify-center">
          리뷰를 불러오는중입니다.
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="w-full h-258pxr md:w-696pxr md:h-528pxr lg:w-996pxr lg:h-474pxr flex items-center justify-center">
        <p className="font-semibold text-red-500">{error.message}</p>
      </div>
    );
  }

  // 페이지 계산
  const totalPage = Math.ceil(data.length / REVIEWS_PER_PAGE);
  const currentReviews = data.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE,
  );

  return (
    <div className="space-y-4 bg-white w-full">
      {currentReviews.map((review) => (
        <GatheringReview review={review} key={review.id} />
      ))}
      <GatheringPagination
        currentPage={currentPage}
        totalPages={totalPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
