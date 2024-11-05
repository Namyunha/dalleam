'use client';
import React from 'react';
import useUserStore from '@/stores/userStore';
import HeartStroke from '/public/icons/HeartStroke.svg';
import { Gathering } from '@/types/gathering';
import { SavedGathering } from '@/stores/savedStore';
import useSavedStore from '@/stores/savedStore';

import SaveActive from '/public/icons/SaveActive.svg';

export default function Saved({ gathering }: { gathering: Gathering }) {
  const { user } = useUserStore();
  const { savedGatherings, setSavedGathering } = useSavedStore();

  const savedInfo: SavedGathering = {
    userId: user?.id ?? 1,
    savedId: gathering.id,
    gathering,
    savedTime: new Date(),
  };

  const onWishListHandler = () => {
    const result = savedGatherings.find(
      (savedGathering) => savedInfo.gathering.id === savedGathering.gathering.id,
    );

    const removedGatherings = savedGatherings.filter(
      (savedGathering) => savedInfo.gathering.id !== savedGathering.gathering.id,
    );
    const addedGatherings = [...savedGatherings, savedInfo];

    !result ? setSavedGathering(addedGatherings) : setSavedGathering(removedGatherings);
  };

  return (
    <>
      {savedGatherings?.find(
        (saveGathering) =>
          gathering.id === saveGathering.savedId &&
          (saveGathering.userId === 1 || saveGathering.userId === user?.id),
      ) ? (
        <SaveActive onClick={() => onWishListHandler()} className="size-12 cursor-pointer" />
      ) : (
        <span
          onClick={() => onWishListHandler()}
          className={`relative w-12 h-12 flex justify-center items-center rounded-full border-2 border-gray-200 cursor-pointer`}
        >
          <HeartStroke className={`absolute w-6 h-6 stroke-2 stroke-gray-400`} />
        </span>
      )}
    </>
  );
}
