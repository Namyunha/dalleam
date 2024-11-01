import { gatheringPrefetchQuery } from '@/api/prefetch';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import Gathering from './(list)/_components/Gathering';

const HomePage = async () => {
  const queryClient = await gatheringPrefetchQuery();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Gathering />
    </HydrationBoundary>
  );
};

export default HomePage;
