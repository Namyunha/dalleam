'use client';

import { useMyPageFilterStore } from '@/stores/myPageFilterStore';
import { myPageFilterNameType, myPageFilterType } from '@/types/gathering';

export const convertTab = (type: myPageFilterType): myPageFilterNameType => {
  switch (type) {
    case 'joined':
      return '나의 모임';
    case 'review':
      return '나의 리뷰';
    case 'createdBy':
      return '내가 만든 모임';
  }
};

export default function Menu() {
  const { type, setType } = useMyPageFilterStore();

  const myPageTab: myPageFilterType[] = ['joined', 'review', 'createdBy'];

  return (
    <div className="flex flex-col">
      <div className="flex gap-3">
        {myPageTab.map((menu, idx) => {
          return (
            <div key={idx} className="flex flex-col gap-1">
              <span
                onClick={() => setType(menu)}
                className={`text-lg font-semibold ${menu === type ? 'text-gray-900' : 'text-gray-400'} cursor-pointer`}
              >
                {convertTab(menu)}
              </span>
              <span className={`w-full h-2pxr ${menu !== type && 'hidden'} bg-gray-900`} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
