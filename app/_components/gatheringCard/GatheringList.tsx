'use client';

import React from 'react';
import GatheringCard from './GatheringCard';
import { useGatheringInfiniteQuery } from '@/services/gathering';
import { useParams } from '@/hooks/useParams';
import { useInfiniteObserver } from '@/hooks/useInfiniteObserver';
import FilterTab from '@/components/tab/FilterTab';

export default function GatheringCList() {
  const { gatheringQueryKeys, params } = useParams({ isGathering: true });
  const { data, fetchNextPage, isLoading, isError, isFetchingNextPage, hasNextPage } =
    useGatheringInfiniteQuery(gatheringQueryKeys, params);
  const observerRef = useInfiniteObserver(fetchNextPage, { threshold: 0.2 });
  return (
    <div className="flex flex-col items-start gap-6 self-stretch">
      <FilterTab isReviewPage={false} />
      <div className="relative flex flex-col items-start gap-6 self-stretch">
        {data?.pages.map((page) =>
          page.map((gathering, idx) => (
            <div key={idx} className="relative w-full">
              <GatheringCard key={gathering.id} gathering={gathering} />
            </div>
          )),
        )}
        {/* fog 추가하기 */}
        {/* skeleton 추가하기 */}
        {hasNextPage && (
          <div
            className="absolute w-full left-0 bottom-0 -z-10 h-20 border-2"
            ref={observerRef}
          ></div>
        )}
      </div>
    </div>
  );
}
