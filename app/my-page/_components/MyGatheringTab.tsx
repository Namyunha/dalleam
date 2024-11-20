'use client';

import { useMyPageFilterStore } from '@/stores/myPageFilterStore';
import {
  myPageFilterNameType,
  myPageFilterType,
  myPageSubType,
  myPageSubTabType,
} from '@/types/gathering';
import Chip from '@/components/chip/Chip';

export const convertTab = (
  type: myPageFilterType | myPageSubType,
): myPageFilterNameType | myPageSubTabType => {
  switch (type) {
    case 'joined':
      return '나의 모임';
    case 'review':
      return '나의 리뷰';
    case 'createdBy':
      return '내가 만든 모임';
    case 'available':
      return '작성 가능한 리뷰';
    case 'written':
      return '작성한 리뷰';
  }
};

export default function Menu() {
  const { type, setType, subTab, setSubTab } = useMyPageFilterStore();

  const myPageTab: myPageFilterType[] = ['joined', 'review', 'createdBy'];
  const myPageSubTab: myPageSubType[] = ['available', 'written'];

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
      {type === 'review' && (
        <div className="flex flex-col gap-6 pt-4 pb-6">
          <div className="flex gap-2 ">
            {myPageSubTab.map((subMenu, idx) => (
              <Chip
                key={idx}
                onClick={() => setSubTab(subMenu)}
                color={`${subMenu === subTab ? 'navy' : 'gray'}`}
                size="lg"
              >
                {convertTab(subMenu)}
              </Chip>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
