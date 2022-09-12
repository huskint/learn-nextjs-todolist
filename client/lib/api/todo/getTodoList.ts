import { client } from '../client';
import { TodoItem } from '../../interface/todo.interface';

export const getTodoList = async (): Promise<TodoItem[]> => {
  try {
    const url = '/api/todo';
    const { data } = await client.get(url);
    return data.data;
  } catch (e) {
    throw e;
  }
};
