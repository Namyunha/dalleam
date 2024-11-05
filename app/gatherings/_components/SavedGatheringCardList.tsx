'use client';
import React from 'react';
import GatheringCard from '@/app/(list)/_components/gatheringCard/GatheringCard';
import useSavedStore from '@/stores/savedStore';
import useUserStore from '@/stores/userStore';

export default function SavedGatheringCardList() {
  const { user } = useUserStore();
  const { savedGatherings } = useSavedStore();

  const filteredList = savedGatherings.filter(
    (savedGathering) => savedGathering.userId === user?.id || savedGathering.userId === 1,
  );

  return (
    <div className="relative flex flex-col items-start gap-6 self-stretch mt-4">
      {filteredList.map((gathering, idx) => (
        <div key={idx} className="relative w-full">
          <GatheringCard key={gathering.gathering.id} gathering={gathering.gathering} />
        </div>
      ))}
      {/* fog 추가하기 */}
      {/* skeleton 추가하기 */}
      {/* {hasNextPage && (
        <div
          className="absolute w-full left-0 bottom-0 -z-10 h-20 border-2"
          ref={observerRef}
        ></div>
      )} */}
    </div>
  );
}
