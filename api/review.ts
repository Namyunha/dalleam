import { GatheringType } from '@/types/gathering';
import { paramsType, Points, Review, GatheringReview, ReviewListType } from '@/types/review';
import { getInstance } from '@/utils/axios';

const fetcher = getInstance();

export const getReviews = async ({
  pageParam,
  params = { type: 'DALLAEMFIT', sortOrder: 'desc', sortBy: 'createdAt', limit: 10 },
}: {
  pageParam: number;
  params?: paramsType;
}) => {
  const encodedParams = {
    ...params,
    location: params.location ? encodeURIComponent(params.location) : undefined,
    offset: pageParam * 10,
  };
  const result = await fetcher.get('reviews', { params: encodedParams });
  return result.data;
};

export const getWrittenReviews = async (userId: number, pageParam: number): Promise<Review[]> => {
  const result = await fetcher.get('/reviews', {
    params: {
      userId: userId,
      limit: 10,
      offset: pageParam * 10,
    },
  });
  return result.data;
};

export const getAvailableReviews = async (pageParam: number) => {
  const result = await fetcher.get('/gatherings/joined', {
    params: {
      limit: 10,
      offset: pageParam * 10,
      reviewed: false,
      completed: true,
      sortOrder: 'desc',
    },
  });
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
