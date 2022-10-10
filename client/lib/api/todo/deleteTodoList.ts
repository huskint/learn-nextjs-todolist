import { client } from '../client';

export const deleteTodoList = async (id: number) => {
  try {
    const url = `/api/v2/todo/${id}`;
    const userToken = localStorage.getItem('token');
    const headers = {
      authorization: `Bearer ${userToken}`,
    };
    await client.delete(url, { headers });
  } catch (e) {
    throw e;
  }
};
