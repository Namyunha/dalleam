'use client';

import React from 'react';
import ReviewCard from '@/components/card/ReviewCard';
import FilterTab from '@/components/tab/FilterTab';
import { Review } from '@/types/review';
// import { reviewData } from '@/app/reviews/data';

export const reviews: Review[] = [
  {
    teamId: 'FESI',
    id: 1,
    score: 5,
    comment: '테스트1',
    createdAt: '2024-09-25T01:07:31',
    Gathering: {
      teamId: 'FESI',
      id: 111,
      type: 'WORKATION',
      name: '',
      dateTime: '2024-09-25T01:07:31',
      location: '신림',
      image: '/card-image.png',
    },
    User: {
      teamId: 'FESI',
      id: 11,
      name: 'USER1',
      image: '',
    },
  },
  {
    teamId: 'FESI',
    id: 2,
    score: 4,
    comment: '테스트2',
    createdAt: '2024-09-25T01:07:31',
    Gathering: {
      teamId: 'FESI',
      id: 111,
      type: 'WORKATION',
      name: '',
      dateTime: '2024-09-25T01:07:31',
      location: '건대입구',
      image: '/card-image.png',
    },
    User: {
      teamId: 'FESI',
      id: 11,
      name: 'USER1',
      image: '',
    },
  },
  {
    teamId: 'FESI',
    id: 3,
    score: 3,
    comment: '테스트3',
    createdAt: '2024-09-25T01:07:31',
    Gathering: {
      teamId: 'FESI',
      id: 111,
      type: 'WORKATION',
      name: '',
      dateTime: '2024-09-25T01:07:31',
      location: '홍대입구',
      image: '/card-image.png',
    },
    User: {
      teamId: 'FESI',
      id: 11,
      name: 'USER1',
      image: '',
    },
  },
  {
    teamId: 'FESI',
    id: 4,
    score: 4,
    comment: '테스트4',
    createdAt: '2024-09-25T01:07:31',
    Gathering: {
      teamId: 'FESI',
      id: 111,
      type: 'OFFICE_STRETCHING',
      name: '',
      dateTime: '2024-09-25T01:07:31',
      location: '을지로3가',
      image: '/card-image.png',
    },
    User: {
      teamId: 'FESI',
      id: 11,
      name: 'USER1',
      image: '',
    },
  },
  {
    teamId: 'FESI',
    id: 5,
    score: 5,
    comment: '테스트5',
    createdAt: '2024-09-25T01:07:31',
    Gathering: {
      teamId: 'FESI',
      id: 111,
      type: 'WORKATION',
      name: '',
      dateTime: '2024-09-25T01:07:31',
      location: '건대입구',
      image: '/card-image.png',
    },
    User: {
      teamId: 'FESI',
      id: 11,
      name: 'USER1',
      image: '',
    },
  },
];

export const reviewData = {
  pageParams: [0], // 첫 페이지를 나타내는 파라미터
  pages: [
    {
      currentPage: 1, // 현재 페이지 번호
      totalItemCount: 1, // 총 아이템 수
      totalPages: 1, // 총 페이지 수
      data: reviews,
      length: 1, // 현재 페이지의 데이터 길이
    },
  ],
};

export default function ReviewList() {
  console.log('reviewData = ', reviewData);
  if (!reviewData?.pages[0].data.length)
    return (
      <div className="w-full h-258pxr md:w-696pxr md:h-528pxr lg:w-996pxr lg:h-474pxr flex items-center justify-center">
        불러올 데이터가 없습니다.
      </div>
    );
  return (
    <div className="flex w-full py-6 px-4 lg:p-6 flex-col items-start gap-10pxr bg-white border-t-2 border-gray-900">
      <div className="flex flex-col items-start gap-6 self-stretch">
        <FilterTab isReviewPage={true} />
        {reviewData?.pages[0].data.map((review: Review, idx: number) => (
          <div key={idx} className="relative w-full">
            <ReviewCard {...review} isMyPage={false} />
          </div>
        ))}
      </div>
    </div>
  );
}
