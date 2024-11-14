import { create } from 'zustand';
import { GatheringType, LocationType, SortType } from '@/types/gathering';

type FilterState = {
  location: LocationType;
  date: string;
  type: GatheringType;
  setType: (type: GatheringType) => void;
  setLocation: (location: LocationType) => void;
  setDate: (date: string) => void;
  resetFilters: () => void; // 리셋 함수 추가
};

export const useMyPageFilterStore = create<FilterState>((set) => ({
  location: '지역 선택',
  date: '날짜 선택',
  type: 'DALLAEMFIT',
  setType: (type: GatheringType) => set({ type }),
  setLocation: (location: LocationType) => set({ location }),
  setDate: (date: string) => set({ date }),
  resetFilters: () =>
    set({
      location: '지역 선택',
      date: '날짜 선택',
      type: 'DALLAEMFIT',
    }),
}));
