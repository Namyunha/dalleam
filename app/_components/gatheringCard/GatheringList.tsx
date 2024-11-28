'use client';

import React from 'react';
import GatheringCard from './GatheringCard';
import { useGatheringInfiniteQuery } from '@/services/gathering';
import { useParams } from '@/hooks/useParams';
import { useInfiniteObserver } from '@/hooks/useInfiniteObserver';
import FilterTab from '@/components/tab/FilterTab';
import { convertDate } from '@/utils/convertData';

export default function GatheringCList() {
  const { gatheringQueryKeys, params } = useParams({ isGathering: true });
  const { data, fetchNextPage, isLoading, isError, isFetchingNextPage, hasNextPage } =
    useGatheringInfiniteQuery(gatheringQueryKeys, params);
  const observerRef = useInfiniteObserver(fetchNextPage, { threshold: 0.2 });
  if (isError) return <div>데이터를 불러올 수 없습니다.</div>;
  const now = convertDate(new Date());

  return (
    <div className="flex flex-col items-start gap-6 self-stretch">
      <FilterTab isReviewPage={false} />
      <div className="relative flex flex-col items-start gap-6 self-stretch">
        {data?.pages[0].length === 0 ? (
          <div className="w-full h-258pxr md:w-696pxr md:h-528pxr lg:w-996pxr lg:h-474pxr flex items-center justify-center">
            불러올 데이터가 없습니다.
          </div>
        ) : (
          <>
            {data?.pages.map((page) =>
              page
                .filter((gathering, _) => gathering.registrationEnd > now)
                .map((gathering, idx) => (
                  <div key={idx} className="relative w-full">
                    <GatheringCard key={gathering.id} gathering={gathering} />
                  </div>
                )),
            )}
            {data?.pages.map((page) =>
              page
                .filter((gathering, _) => gathering.registrationEnd < now)
                .map((gathering, idx) => (
                  <div key={idx} className="relative w-full">
                    <GatheringCard key={gathering.id} gathering={gathering} />
                  </div>
                )),
            )}
          </>
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
