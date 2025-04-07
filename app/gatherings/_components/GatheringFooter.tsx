import clsx from 'clsx';
import React from 'react';

export default function GatheringFooter({
  children,
  isHosted,
}: {
  children: React.ReactNode;
  isHosted: boolean;
}) {
  return (
    <>
      <div className="z-10 flex justify-center w-full px-4 bg-white border-t-2 border-gray-900 border-solid pt-20pxr pb-20pxr md:px-6">
        <div
          className={clsx(
            'flex justify-between w-full max-w-996pxr',
            isHosted && 'flex-col gap-10pxr md:flex-row md:0',
          )}
        >
          <div className="space-y-1">
            <p className="text-sm font-semibold text-gray-900">
              더 건강한 나와 팀을 위한 프로그램 🏃‍️️
            </p>
            <p className="text-xs font-medium text-left text-gray-700 w-[178px] md:w-full">
              모임을 공유해서 더 많은 사람들이 참여할 수 있도록 독려해봐요
            </p>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
