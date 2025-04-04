import useFilterStore from '@/stores/filterStore';
import {
  gatheringDetailQueryKeys,
  gatheringQueryKeys,
  gatheringReviewQueryKeys,
  participantQueryKeys,
  savedGatheringQueryKeys,
} from '@/types/gathering';
import { reviewQueryKeys, reviewScoresQueryKeys } from '@/types/review';

export const getQueryKeys = (isGathering?: boolean, id?: number) => {
  const { type, location, date, reviewSortBy, sortBy } = useFilterStore();
  let queryKeys = { type, location, date, sortBy: isGathering ? sortBy : reviewSortBy };
  const gatheringQueryKeys: gatheringQueryKeys = [['gathering'], queryKeys];
  const savedGatheringQueryKeys: savedGatheringQueryKeys = [['gathering', 'saved'], queryKeys];
  const participantQueryKeys: participantQueryKeys = [
    ['gathering', 'participants'],
    { id: id || 0 },
  ];
  const gatheringReviewQueryKeys: gatheringReviewQueryKeys = [
    ['gathering', 'reviews'],
    { id: id || 0 },
  ];
  const gatheringDetailQueryKeys: gatheringDetailQueryKeys = [['gathering'], { id: id || 0 }];
  const reviewScoresQueryKeys: reviewScoresQueryKeys = [['reviews', 'scores'], queryKeys];
  const reviewQueryKeys: reviewQueryKeys = [['reviews'], queryKeys];
  return {
    gatheringDetailQueryKeys,
    participantQueryKeys,
    gatheringQueryKeys,
    savedGatheringQueryKeys,
    reviewQueryKeys,
    reviewScoresQueryKeys,
    gatheringReviewQueryKeys,
  };
};
