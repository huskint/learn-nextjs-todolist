import { client } from '../client';
import { UserParam } from '../../interface/user.interface';

export const signInUserAPI = async (param: UserParam) => {
  const url = '/api/user/signin';
  const response = await client.post(url, param);
  return response;
};
