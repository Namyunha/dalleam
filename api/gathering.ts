import { gatheringSchema } from '@/constants/formSchema';
import { Gathering } from '@/types/gathering';
import { paramsType } from '@/types/review';
import { getInstance } from '@/utils/axios';

const fetcher = getInstance();

export const getGatherings = async ({
  pageParam,
  params = { type: 'DALLAEMFIT', sortOrder: 'desc', sortBy: 'registrationEnd', limit: 10 },
}: {
  pageParam: number;
  params?: paramsType;
}): Promise<Gathering[]> => {
  const encodedParams = {
    ...params,
    location: params.location ? encodeURIComponent(params.location) : undefined,
    offset: pageParam * 10,
  };
  const result = await fetcher.get('gatherings', { params: encodedParams });
  return result.data;
};

export const postGathering = async ({ gathering }: { gathering: gatheringSchema }) => {
  const response = await fetcher.post('/gatherings', gathering, {
    headers: { 'Content-Type': 'multipart/form-data', charset: 'utf-8' },
  });
  return response.data;
};
