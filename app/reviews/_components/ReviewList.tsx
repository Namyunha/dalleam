'use client';

import React, { useState } from 'react';
import ReviewCard from '@/components/card/ReviewCard';
import { useInfiniteObserver } from '@/hooks/useInfiniteObserver';
import { useReviewsInfiniteQuery } from '@/services/reviews';
import SkeletonList from './skeletonComponents/SkeletonList';
import SkeletonCard from './skeletonComponents/SkeletonCard';
import DeferredComponent from '@/components/DeferredComponent';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/utils/className';
import { useParams } from '@/hooks/useParams';
import FilterTab from '@/components/tab/FilterTab';

export default function ReviewList() {
  const topFog =
    'before:w-full before:sticky before:left-0 before:z-20 before:h-[120px] before:bg-gradient-to-t before:from-listColor-toColor before:to-listColor-fromColor before:top-0';
  const bottomFog =
    'after:w-full after:sticky after:left-0 after:z-20 after:h-[100px] after:bg-gradient-to-t after:from-listColor-fromColor after:to-listColor-toColor after:bottom-0';

  const [topFogOn, setTopFogOn] = useState(false);
  const [bottomFogOn, setBottomFogOn] = useState(false);

  const { ref: topRef } = useInView({
    threshold: 0, // 최소한으로 걸쳤을 때 감지
    onChange: (inView) => {
      if (!inView) {
        setTopFogOn(true);
      } else {
        setTopFogOn(false);
      }
    },
  });

  const { ref: bottomRef } = useInView({
    threshold: 0, // 최소한으로 걸쳤을 때 감지
    onChange: (inView) => {
      if (!inView) {
        setBottomFogOn(true);
      } else {
        setBottomFogOn(false);
      }
    },
  });
  const { params, reviewQueryKeys } = useParams({ isGathering: false });
  const { data, fetchNextPage, isLoading, isError, isFetchingNextPage, hasNextPage } =
    useReviewsInfiniteQuery(reviewQueryKeys, params);
  const observerRef = useInfiniteObserver(fetchNextPage, { threshold: 0.2 });

  if (isError) return <div>데이터를 불러올 수 없습니다.</div>;
  if (!data?.pages[0].length)
    return (
      <div className="w-full h-258pxr md:w-696pxr md:h-528pxr lg:w-996pxr lg:h-474pxr flex items-center justify-center">
        불러올 데이터가 없습니다.
      </div>
    );
  if (isLoading)
    return (
      <DeferredComponent>
        <SkeletonList />
      </DeferredComponent>
    );

  return (
    <div className="flex w-full py-6 px-4 lg:p-6 flex-col items-start gap-10pxr bg-white border-t-2 border-gray-900">
      <div className="flex flex-col items-start gap-6 self-stretch">
        <FilterTab isReviewPage={true} />
        <div
          className={cn(
            `${topFogOn && topFog} ${bottomFogOn && bottomFog} relative flex flex-col items-start gap-6 self-stretch`,
          )}
        >
          {data?.pages.map((page) =>
            page.map((review, idx) => (
              <div key={idx} className="relative w-full">
                {idx === 0 && (
                  <div ref={topRef} className="w-full absolute z-20 -top-6 left-0 h-6"></div>
                )}
                <ReviewCard {...review} isMyPage={false} />
              </div>
            )),
          )}
          <div ref={bottomRef} className="w-full z-20 bottom-6 left-0 h-6"></div>
          {isFetchingNextPage && <SkeletonCard />}
        </div>
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
