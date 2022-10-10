import { client } from '../client';
import { TodoItemType } from '../../interface/todo.interface';

export const getTodoList = async (): Promise<TodoItemType[]> => {
  try {
    const url = '/api/v2/todo';
    const userToken = localStorage.getItem('token');
    console.log(`Bearer ${userToken}`, userToken);
    const headers = {
      authorization: `Bearer ${userToken}`,
    };
    const { data } = await client.get(url, { headers });
    return data.data;
  } catch (e) {
    throw e;
  }
};
