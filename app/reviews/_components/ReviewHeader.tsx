import React from 'react';
import ListHeader from '@/components/list/ListHeader';
import Review from '/public/icons/review.svg';
import ReviewsTabs from './ReviewsTabs';

export default function ReviewHeader() {
  return (
    <ListHeader>
      <Review />
      <div className="flex flex-col items-start gap-2">
        <div className="text-lg md:text-2xl font-semibold text-gray-900">모든 리뷰</div>
        <div className="text-sm font-medium">같이달램을 이용한 분들은 이렇게 느꼈어요</div>
      </div>
    </ListHeader>
  );
}
