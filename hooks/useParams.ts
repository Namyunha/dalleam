import useFilterStore from '@/stores/filterStore';
import { gatheringQueryKeys, savedGatheringQueryKeys } from '@/types/gathering';
import { paramsType, reviewQueryKeys, reviewScoresQueryKeys } from '@/types/review';
import { convertSortType } from '@/utils/convertData';

export const useParams = ({ isGathering }: { isGathering: boolean }) => {
  const { type, location, date, reviewSortBy, sortBy } = useFilterStore();
  let queryKeys = { type, location, date, sortBy: isGathering ? sortBy : reviewSortBy };
  let gatheringQueryKeys: gatheringQueryKeys = [['gathering'], queryKeys];
  let savedGatheringQueryKeys: savedGatheringQueryKeys = [['gathering', 'saved'], queryKeys];
  let reviewQueryKeys: reviewQueryKeys = [['reviews'], queryKeys];
  let reviewScoresQueryKeys: reviewScoresQueryKeys = [['reviews', 'scores'], queryKeys];
  let params: paramsType = {
    limit: 10,
    type,
    sortOrder: 'desc',
    location: location === '지역 선택' ? undefined : location,
    date: date === '날짜 선택' ? undefined : date,
    sortBy: convertSortType(isGathering ? sortBy : reviewSortBy),
  };
  return {
    params,
    reviewQueryKeys,
    reviewScoresQueryKeys,
    gatheringQueryKeys,
    savedGatheringQueryKeys,
  };
};
