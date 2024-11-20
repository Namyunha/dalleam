import { User } from '@/types/user';
import { getInstance } from '@/utils/axios';

const fetcher = getInstance();

export const getUser = async () => {
  const res = await fetcher.get<User>('/auths/user');
  return res.data;
};
