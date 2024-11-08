import Button from '@/components/Button';
import React from 'react';

export default function GatheringDetailButton() {
  return (
    <Button
      className="text-sm  sm:w-1/2 md:w-[110px] h-[44px]"
      fillState="full"
      onClick={() => cancelGathering({ gatheringId, type })}
    >
      {isGatheringCanceling ? '모임 취소중..' : '모임 취소하기'}
    </Button>
  );
}
