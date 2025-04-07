import ReviewHeader from '@/app/reviews/_components/ReviewHeader';
import ReviewsTabs from '@/app/reviews/_components/ReviewsTabs';
import React from 'react';
import ReviewScores from './ReviewScore';
import ReviewList from './ReviewList';

function Reviews() {
  return (
    <>
      <ReviewHeader />
      <ReviewsTabs />
      <ReviewScores />
      <ReviewList />
    </>
  );
}

export default Reviews;
