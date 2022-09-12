import { client } from '../client';

export const postTodoList = async (param: { text: string }) => {
  try {
    const url = '/api/todo';
    await client.post(url, param);
  } catch (e) {
    throw e;
  }
};
