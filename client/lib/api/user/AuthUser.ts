import { client } from '../client';

export const AuthUserAPI = async () => {
  const url = '/api/user/auth';
  const userToken = localStorage.getItem('token');
  const headers = {
    authorization: `Bearer ${userToken}`,
  };
  const response = await client.post(url, null, { headers });
  return response;
};
