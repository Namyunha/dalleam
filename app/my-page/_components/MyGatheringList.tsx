// MyGatheringList.tsx
'use client';

import React, { useEffect } from 'react';
import { useMyPageFilterStore } from '@/stores/myPageFilterStore';
import JoinedReviews from './JoinedReviews';
import WrittenReviews from './WrittenReviews';
import CreatedGatherings from './CreatedGatherings';
// 다른 import들...

export default function MyGatheringList() {
  const { type, setType } = useMyPageFilterStore();
  useEffect(() => {
    setType('joined');
    return () => {
      setType('joined');
    };
  }, []);
  return (
    <>
      {type === 'joined' && <JoinedReviews />}
      {type === 'review' && <WrittenReviews />}
      {type === 'createdBy' && <CreatedGatherings />}
    </>
  );
}
