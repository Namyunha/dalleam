// MyGatheringList.tsx
'use client';

import React from 'react';
import { useMyPageFilterStore } from '@/stores/myPageFilterStore';
import JoinedReviews from './JoinedReviews';
import AvailableReview from './AvailableReview';
import WrittenReviews from './WrittenReviews';
import CreatedGatherings from './CreatedGatherings';
// 다른 import들...

export default function MyGatheringList() {
  const { type, subTab } = useMyPageFilterStore();
  return (
    <>
      {type === 'joined' && <JoinedReviews />}
      {type === 'review' && (subTab === 'available' ? <AvailableReview /> : <WrittenReviews />)}
      {type === 'createdBy' && <CreatedGatherings />}
    </>
  );
}
