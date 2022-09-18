import { createSlice } from '@reduxjs/toolkit';

import { TodoItemType } from '../interface/todo.interface';

const initialState: TodoItemType[] = [];

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    createTodo: (state, action) => [...state, action.payload],
    deleteTodo: (state, action) => state.filter((el) => el.id !== action.payload),
    toggleDone: (state, action) => state
      .map((el) => (
        el.id === action.payload
          ? ({ ...el, done: !el.done })
          : el)),
  },
});

export default todoSlice;
export const { createTodo, deleteTodo, toggleDone } = todoSlice.actions;
