import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { TodoItemType } from '../interface/todo.interface';
import { getTodoList } from '../api/todo/getTodoList';
import { postTodoList } from '../api/todo/postTodoList';
import { deleteTodoList } from '../api/todo/deleteTodoList';
import { patchTodoList } from '../api/todo/patchTodoList';

const initialState: TodoItemType[] = [];

export const getTodo = createAsyncThunk(
  'todo/getTodo',
  async () => {
    const response = await getTodoList();
    return response;
  },
);

export const createTodo = createAsyncThunk(
  'todo/createTodo',
  async (text: string) => {
    await postTodoList({ text });
    const response = await getTodoList();
    return response;
  },
);

export const deleteTodo = createAsyncThunk(
  'todo/deleteTodo',
  async (id: number) => {
    await deleteTodoList(id);
    const response = await getTodoList();
    return response;
  },
);

export const toggleDone = createAsyncThunk(
  'todo/toggleDone',
  async ({ id, done }: { id: number, done: boolean }) => {
    await patchTodoList(id, { done });
    const response = await getTodoList();
    return response;
  },
);

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    // createTodo: (state, action) => [...state, action.payload],
    // deleteTodo: (state, action) => state.filter((el) => el.id !== action.payload),
    // toggleDone: (state, action) => state
    //   .map((el) => (
    //     el.id === action.payload
    //       ? ({ ...el, done: !el.done })
    //       : el)),
  },
  extraReducers: ((builder) => {
    builder.addCase(getTodo.fulfilled, (state, action) => action.payload);
    builder.addCase(getTodo.rejected, () => []);
    builder.addCase(createTodo.fulfilled, (state, action) => action.payload);
    builder.addCase(deleteTodo.fulfilled, (state, action) => action.payload);
    builder.addCase(toggleDone.fulfilled, (state, action) => action.payload);
  }),
});

export default todoSlice;
// export const { toggleDone } = todoSlice.actions;
