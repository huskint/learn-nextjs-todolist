import { client } from '../client';
import { TodoItemType } from '../../interface/todo.interface';

export const getTodoList = async (): Promise<TodoItemType[]> => {
  try {
    const url = '/api/todo';
    const { data } = await client.get(url);
    return data.data;
  } catch (e) {
    throw e;
  }
};
