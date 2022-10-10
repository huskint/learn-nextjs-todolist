import { client } from '../client';

export const postTodoList = async (param: { text: string }) => {
  try {
    const url = '/api/v2/todo';
    const userToken = localStorage.getItem('token');
    const headers = {
      authorization: `Bearer ${userToken}`,
    };
    await client.post(url, param, { headers });
  } catch (e) {
    throw e;
  }
};
