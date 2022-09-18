import { createSlice } from '@reduxjs/toolkit';

import { TodoItemType } from '../../pages/todolist3';

const initialState: TodoItemType[] = [];

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    create: (state, action) => [...state, action.payload],
  },
});

export default todoSlice;
export const { create } = todoSlice.actions;
