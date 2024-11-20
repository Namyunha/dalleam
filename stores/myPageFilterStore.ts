import { create } from 'zustand';
import { myPageFilterType } from '@/types/gathering';

type myPageSubTabType = 'available' | 'written';

type FilterState = {
  type: myPageFilterType;
  subTab: myPageSubTabType;
  setType: (type: myPageFilterType) => void;
  setSubTab: (tab: myPageSubTabType) => void;
};

export const useMyPageFilterStore = create<FilterState>((set) => ({
  type: 'joined',
  subTab: 'available',
  setType: (type: myPageFilterType) => set({ type }),
  setSubTab: (subTab: myPageSubTabType) => set({ subTab }),
}));
