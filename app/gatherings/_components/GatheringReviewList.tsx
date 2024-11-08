'use client';
import React, { useState } from 'react';

import GatheringReview from './GatheringReview';

import { Review } from '@/types/review';
import CustomPagination from './Pagination';

const REVIEWS_PER_PAGE = 3;

export default function GatheringReviewList({ reviews }: { reviews: Review[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  const currentReviews = reviews.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE,
  );

  return (
    <div className="space-y-4 bg-white w-full">
      {currentReviews.map((review) => (
        <GatheringReview review={review} key={review.id} />
      ))}
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
