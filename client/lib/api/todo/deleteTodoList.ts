import { client } from '../client';

export const deleteTodoList = async (id: number) => {
  try {
    const url = `/api/todo/${id}`;
    await client.delete(url);
  } catch (e) {
    throw e;
  }
};
