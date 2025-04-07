import { create } from 'zustand';
import { myPageFilterType } from '@/types/gathering';

type FilterState = {
  type: myPageFilterType;
  setType: (type: myPageFilterType) => void;
};

export const useMyPageFilterStore = create<FilterState>((set) => ({
  type: 'joined',
  setType: (type: myPageFilterType) => set({ type }),
}));
