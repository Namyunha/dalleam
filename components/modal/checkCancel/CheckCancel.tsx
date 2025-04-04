'use client';
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from '@/components/toast/ToastManager';
import Button from '@/components/Button';
import { getInstance } from '@/utils/axios';
import useGatheringId from '@/stores/useGatheringId';
import { JoinedGathering } from '@/types/gathering';

import Delete from '/public/icons/delete.svg';

type Props = {
  closeModal: () => void;
};

type QueryData = {
  pageParams: number[];
  pages: JoinedGathering[];
};

export default function CheckCancel({ closeModal }: Props) {
  const queryClient = useQueryClient();
  const { id, clearId } = useGatheringId();

  const leaveGathering = async () => {
    const instance = getInstance();

    const res = await instance.delete(`/gatherings/${id}/leave`);

    return res;
  };

  const { mutate } = useMutation({
    mutationFn: leaveGathering,
    onSuccess: () => {
      toast('해당 모임 예약이 취소되었습니다.');
      closeModal();
      clearId();
      queryClient.setQueryData(['gatheringJoined'], (oldData: QueryData) => {
        const updateData = oldData.pages.flat().filter((data: JoinedGathering) => data.id !== id);

        const pages = updateData.reduce((acc: JoinedGathering[][], _, i: number) => {
          if (i % 10 === 0) {
            acc.push(updateData.slice(i, i + 10));
          }

          return acc;
        }, []);

        return {
          ...oldData,
          pages: pages,
        };
      });
    },
  });

  return (
    <form
      className="w-343pxr p-6 rounded-xl flex flex-col gap-6 bg-white"
      onSubmit={(e) => {
        e.preventDefault();
        mutate();
      }}
    >
      <div className="flex justify-between">
        <span className="text-lg font-semibold text-gray-900">예약 취소</span>
        <Delete
          aria-label="deleteIcon"
          className="cursor-pointer"
          onClick={() => {
            closeModal();
            clearId();
          }}
        />
      </div>
      <div className="text-base font-semibold text-gray-800">
        정말 해당 모임 예약을 취소하시겠습니까?
      </div>
      <div className="w-full flex gap-4">
        <Button
          onClick={() => {
            closeModal();
            clearId();
          }}
          className="w-full flex justify-center items-center "
          fillState="empty"
          variant="orange"
        >
          취소
        </Button>
        <Button
          type="submit"
          className="w-full flex justify-center items-center "
          fillState="full"
          variant="gray"
        >
          확인
        </Button>
      </div>
    </form>
  );
}
