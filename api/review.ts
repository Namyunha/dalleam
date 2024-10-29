import { GatheringType } from '@/types/gathering';
import { paramsType, Points, Review } from '@/types/review';
import { getInstance } from '@/utils/axios';

const fetcher = getInstance();

export const getReviews = async ({
  pageParam,
  params = { type: 'DALLAEMFIT', sortOrder: 'desc', sortBy: 'createdAt' },
}: {
  pageParam: number;
  params?: paramsType;
}): Promise<Review[]> => {
  const limit = 10;
  const offset = pageParam * limit;
  const encodedParams = {
    ...params,
    location: params.location ? encodeURIComponent(params.location) : undefined,
    limit,
    offset,
  };

  const result = await fetcher.get('reviews', { params: encodedParams });
  return result.data;
};

export const getScores = async (typeTab: GatheringType = 'DALLAEMFIT'): Promise<Points[]> => {
  const result = await fetcher.get(`reviews/scores?type=${typeTab}`);
  return result.data; //
};
