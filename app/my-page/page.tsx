import React from 'react';
import MyGatherings from './_components/MyGatherings';
import { getJoinedGatheringPrefetchQuery } from '@/api/prefetch';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function MyGatheringPage() {
  const queryClient = await getJoinedGatheringPrefetchQuery();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyGatherings />;
    </HydrationBoundary>
  );
}
