import React from 'react';
import ListHeader from '@/components/list/ListHeader';
import Head from '/public/icons/gathering/head.svg';

export default function GatheringHeader() {
  return (
    <ListHeader>
      <Head />
      <div className="flex flex-col items-start gap-2">
        <p className="text-sm font-medium text-left text-gray-700">함께 할 사람이 없나요?</p>
        <h1 className="text-lg font-semibold text-gray-900 md:text-2xl">
          지금 모임에 참여해보세요
        </h1>
      </div>
    </ListHeader>
  );
}
