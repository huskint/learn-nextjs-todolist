import { observable } from 'mobx';

import { TodoItemType } from '../interface/todo.interface';
import { getTodoList } from '../api/todo/getTodoList';
import { postTodoList } from '../api/todo/postTodoList';
import { deleteTodoList } from '../api/todo/deleteTodoList';
import { patchTodoList } from '../api/todo/patchTodoList';

export interface Store {
  todo: TodoItemType[];
  getTodo: () => Promise<void>;
  createTodo: (text: string) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  toggleDone: (id: number, done: boolean) => Promise<void>;
}

export const store: Store = {
  todo: [],
  async getTodo() {
    const response = await getTodoList();
    this.todo = response;
  },
  async createTodo(text) {
    await postTodoList({ text });
    await this.getTodo();
  },

  async deleteTodo(id) {
    await deleteTodoList(id);
    await this.getTodo();
  },

  async toggleDone(id, done) {
    await patchTodoList(id, { done });
    await this.getTodo();
  },
};

export default observable.object(store);
