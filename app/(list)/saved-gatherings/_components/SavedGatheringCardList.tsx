'use client';
import React from 'react';
import GatheringCard from '@/app/(list)/_components/gatheringCard/GatheringCard';
import useSavedStore from '@/stores/savedStore';
import useUserStore from '@/stores/userStore';
import useFilterStore from '@/stores/filterStore';

export default function SavedGatheringCardList() {
  const { user } = useUserStore();
  const { savedGatherings } = useSavedStore();
  const { type } = useFilterStore();

  let filteredList = savedGatherings.filter(
    (savedGathering) => savedGathering.userId === user?.id || savedGathering.userId === 1,
  );

  filteredList = filteredList.filter((el) =>
    type !== 'DALLAEMFIT' ? el.gathering.type === type : type,
  );

  if (!filteredList.length)
    return (
      <div className="w-full h-258pxr md:w-696pxr md:h-528pxr lg:w-996pxr lg:h-474pxr flex items-center justify-center">
        아직 찜한 모임이 없어요
      </div>
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
