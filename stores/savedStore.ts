import { Gathering } from '@/types/gathering';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SavedGathering = {
  userId?: number;
  savedId?: number;
  gathering: Gathering;
  savedTime: Date;
};
type Savedstore = {
  savedGatherings: SavedGathering[];
  setSavedGathering: (gatherings: SavedGathering[]) => void;
  hydrated: boolean;
  setHydrated: (hydrated: boolean) => void;
};
const useSavedStore = create(
  persist<Savedstore>(
    (set) => ({
      savedGatherings: [],
      setSavedGathering: (gatherings) =>
        set(() => {
          return {
            savedGatherings: gatherings,
          };
        }),
      setHydrated: (hydrated: boolean) => set({ hydrated }),
      hydrated: false,
    }),
    {
      name: 'saved',
      onRehydrateStorage: () => (state) => {
        if (state && state.setHydrated) {
          state.setHydrated(true);
        }
      },
    },
  ),
);

export default useSavedStore;
