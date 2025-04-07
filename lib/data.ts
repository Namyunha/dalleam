// fetcher 함수 작성 파일
import { getInstance } from '@/utils/axios';
import { User } from '@/types/user';

export const login = async (body: { email: string; password: string }) => {
  const instance = getInstance();
  const res = await instance.post<{
    token: string;
  }>('auths/signin', body);

  return res.data;
};

export const register = async (body: {
  email: string;
  password: string;
  name: string;
  companyName: string;
}) => {
  const instance = getInstance();
  const res = await instance.post<{
    message: string;
  }>('auths/signup', body);

  return res.data;
};

export const getUser = async () => {
  const instance = getInstance();
  const res = await instance.get<User>('/auths/user');

  return res.data;
};
