import { client } from '../client';

export const patchTodoList = async (id: number, param: { done: boolean }) => {
  try {
    const url = `/api/v2/todo/${id}`;
    const userToken = localStorage.getItem('token');
    const headers = {
      authorization: `Bearer ${userToken}`,
    };
    await client.patch(url, param, { headers });
  } catch (e) {
    throw e;
  }
};
