// MyGatheringList.tsx
'use client';

import React, { useEffect } from 'react';
import { useMyPageFilterStore } from '@/stores/myPageFilterStore';
import JoinedReviews from './JoinedReviews';
import AvailableReview from './AvailableReview';
import WrittenReviews from './WrittenReviews';
import CreatedGatherings from './CreatedGatherings';
// 다른 import들...

export default function MyGatheringList() {
  const { type, setType, subTab, setSubTab } = useMyPageFilterStore();
  useEffect(() => {
    setType('joined');
    setSubTab('available');
    return () => {
      setType('joined');
      setSubTab('available');
    };
  }, []);
  return (
    <>
      {type === 'joined' && <JoinedReviews />}
      {type === 'review' && (subTab === 'available' ? <AvailableReview /> : <WrittenReviews />)}
      {type === 'createdBy' && <CreatedGatherings />}
    </>
  );
}
