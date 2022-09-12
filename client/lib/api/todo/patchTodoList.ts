import { client } from '../client';

export const patchTodoList = async (id: number, param: { done: boolean }) => {
  try {
    const url = `/api/todo/${id}`;
    await client.patch(url, param);
  } catch (e) {
    throw e;
  }
};
