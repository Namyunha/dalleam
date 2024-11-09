import React from 'react';
import ListHeader from '@/components/list/ListHeader';
import Heart from '/public/icons/gathering/type_saved.svg';

export default function Header() {
  return (
    <ListHeader>
      <Heart />
      <div className="flex flex-col gap-2">
        <span className="text-2xl font-semibold text-gray-900">찜한 모임</span>
        <span className="text-sm font-medium text-gray-700">
          마감되기 전에 지금 바로 참여해보세요 👀
        </span>
      </div>
    </ListHeader>
  );
}
