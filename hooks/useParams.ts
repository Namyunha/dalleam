import useFilterStore from '@/stores/filterStore';
import { paramsType } from '@/types/review';
import { convertSortType } from '@/utils/convertData';
import { getQueryKeys } from '@/api/queryKeys';

export const useParams = ({ isGathering }: { isGathering: boolean }) => {
  const { type, location, date, reviewSortBy, sortBy } = useFilterStore();
  const { gatheringQueryKeys, savedGatheringQueryKeys, reviewQueryKeys, reviewScoresQueryKeys } =
    getQueryKeys(isGathering);

  let params: paramsType = {
    limit: 10,
    type,
    sortOrder: sortBy === '마감 임박' ? 'asc' : 'desc',
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
