// JoinedReviews.tsx
import { InfiniteData } from '@tanstack/react-query';
import { JoinedGathering } from '@/types/gathering';
import React from 'react';
import Card from '@/components/card/Card';

type Props = {
  data?: InfiniteData<JoinedGathering[]>;
  handleOpenModal: (id: number) => void;
};

export default function JoinedReviews({ data, handleOpenModal }: Props) {
  return (
    <div className="pt-6 min-h-[60vh] flex justify-center">
      {!data || data.pages.length === 0 ? (
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-500">신청한 모임이 아직 없어요</span>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {data.pages.map((page, pageIndex) =>
            page.map((gathering) => (
              <Card
                normal={false}
                gathering={gathering}
                key={`${pageIndex}-${gathering.id}`} // 고유한 키 생성
                openModal={() => handleOpenModal(gathering.id)}
                isReviewed={gathering.isReviewed}
              />
            )),
          )}
        </div>
      )}
    </div>
  );
}
