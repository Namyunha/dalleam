import React from 'react';
import MyPages from './_components/MyPages';
import { getJoinedGatheringPrefetchQuery } from '@/api/prefetch';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getUser } from '@/api/user';

export default async function MyGatheringPage() {
  const data = await getUser();
  if (!data.id) '데이터를 불러오는 중입니다';

  const queryClient = await getJoinedGatheringPrefetchQuery(data.id);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyPages />
    </HydrationBoundary>
  );
}
