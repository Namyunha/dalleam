import { create } from 'zustand';
import { GatheringType, LocationType, SortType } from '@/types/gathering';

type FilterState = {
  location: LocationType;
  date: string;
  sortBy: SortType;
  reviewSortBy: SortType;
  type: GatheringType;
  setType: (type: GatheringType) => void;
  setLocation: (location: LocationType) => void;
  setDate: (date: string) => void;
  setSortBy: (orderBy: SortType) => void;
  setReviewSortBy: (orderBy: SortType) => void;
  resetFilters: () => void; // 리셋 함수 추가
};

const useFilterStore = create<FilterState>((set) => ({
  location: '지역 선택',
  date: '날짜 선택',
  sortBy: '마감 임박',
  reviewSortBy: '최신 순',
  type: 'DALLAEMFIT',
  setType: (type: GatheringType) => set({ type }),
  setLocation: (location: LocationType) => set({ location }),
  setDate: (date: string) => set({ date }),
  setSortBy: (sortBy: SortType) => set({ sortBy }),
  setReviewSortBy: (reviewSortBy: SortType) => set({ reviewSortBy }),
  resetFilters: () =>
    set({
      location: '지역 선택',
      date: '날짜 선택',
      sortBy: '마감 임박',
      type: 'DALLAEMFIT',
      reviewSortBy: '최신 순',
    }),
}));

export default useFilterStore;
