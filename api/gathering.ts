import { gatheringSchema } from '@/constants/formSchema';
import { Gathering, Participant } from '@/types/gathering';
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

export const getJoinedGatherings = async ({
  pageParam,
  params = { completed: false, reviewed: false },
}: {
  pageParam: number;
  params?: { completed: boolean; reviewed: boolean };
}) => {
  const result = await fetcher.get('/gatherings/joined', {
    params: {
      ...params,
      limit: 10,
      sortOrder: 'desc',
      offset: pageParam * 10,
    },
  });
  return result.data;
};

export const getGatheringDetail = async (id: number) => {
  const result = await fetcher.get<Gathering>(`gatherings/${id}`);
  return result.data;
};

export const postGathering = async ({ gathering }: { gathering: gatheringSchema }) => {
  const result = await fetcher.post('/gatherings', gathering, {
    headers: { 'Content-Type': 'multipart/form-data', charset: 'utf-8' },
  });
  return result.data;
};

export const joinGathering = async (id: number) => {
  const result = await fetcher.post(`gatherings/${id}/join`);
  return result.data;
};

export const leaveGathering = async (id: number) => {
  const result = await fetcher.delete(`gatherings/${id}/leave`);
  return result.data;
};

export const cancelGathering = async (id: number) => {
  const response = await fetcher.put(`gatherings/${id}/cancel`);
  return response.data;
};

export const getGatheringParticipants = async (id: number) => {
  const result = await fetcher.get<Participant[]>(`gatherings/${id}/participants`, {
    params: { limit: 100 },
  });
  return result.data;
};
