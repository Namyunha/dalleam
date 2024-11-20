import React from 'react';
import Card from '@/components/card/Card';
import { InfiniteData } from '@tanstack/react-query';
import { JoinedGathering } from '@/types/gathering';

export default function CreatedGatherings({ data }: { data?: InfiniteData<any> }) {
  return (
    <>
      <div className="pt-6 min-h-[60vh] flex justify-center">
        {!data ? (
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-500">아직 만든 모임이 없어요</span>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {data?.pages.flat().map((gathering) => {
              return <Card normal gathering={gathering} key={gathering.id} />;
            })}
          </div>
        )}
      </div>
    </>
  );
}
