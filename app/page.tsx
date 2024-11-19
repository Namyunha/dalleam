import { gatheringPrefetchQuery } from '@/api/prefetch';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import Gathering from './_components/Gathering';

export default async function Page() {
  const queryClient = await gatheringPrefetchQuery();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Gathering />
    </HydrationBoundary>
  );
}
