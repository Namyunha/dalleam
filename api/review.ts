import { GatheringType } from '@/types/gathering';
import { paramsType, Points, Review, GatheringReview } from '@/types/review';
import { getInstance } from '@/utils/axios';

const fetcher = getInstance();

export const getReviews = async ({
  pageParam,
  params = { type: 'DALLAEMFIT', sortOrder: 'desc', sortBy: 'createdAt', limit: 10 },
}: {
  pageParam: number;
  params?: paramsType;
}): Promise<Review[]> => {
  const encodedParams = {
    ...params,
    location: params.location ? encodeURIComponent(params.location) : undefined,
    offset: pageParam * 10,
  };

  const result = await fetcher.get('reviews', { params: encodedParams });
  return result.data;
};

export const getScores = async (typeTab: GatheringType = 'DALLAEMFIT'): Promise<Points[]> => {
  const result = await fetcher.get(`reviews/scores?type=${typeTab}`);
  return result.data;
};

export const getGatheringReviews = async (id: number) => {
  const result = await fetcher.get<Review[]>('reviews', {
    params: { gatheringId: id },
  });
  return result.data;
};

export const postReviews = async (review: GatheringReview) => {
  const result = await fetcher.post('/reviews', review);
  return result.data;
};
