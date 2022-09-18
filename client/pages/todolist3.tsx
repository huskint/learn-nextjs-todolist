import React, {
  ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState,
} from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { TodoCreate, TodoHeader, TodoList } from '@components/todo';

// eslint-disable-next-line import/no-cycle
import { RootState } from '../lib/store';
import getDateString from '../lib/utils/getDateString';
import { create } from '../lib/store/todoSlice';

const { dateString, dayName } = getDateString();

export interface TodoItemType {
  id: number;
  text: string;
  done: boolean;
}

const Todolist3 = () => {
  const dispatch = useDispatch();
  const todoList = useSelector((state: RootState) => state.todo);
  useEffect(() => {
    dispatch(create({
      id: 0,
      text: '투두리스트 등록 테스트1',
      done: false,
    }));
  }, []);
  useEffect(() => {
    console.log('todo Store >', todoList);
  }, [todoList]);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [createInput, setCreateInput] = useState('');
  const [todos, setTodos] = useState<TodoItemType[]>([]);

  const unDoneTaskLength = useMemo(() => todos.filter((todo) => !todo.done).length, [todos]);

  const nextId = useRef(0);

  const onToggleIsOpenCreate = () => {
    setIsOpenCreate((prev) => !prev);
  };

  const onChangeCreateInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCreateInput(value);
  };

  const onSubmitCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    nextId.current += 1;
    setTodos((prev) => [...prev, { id: nextId.current, text: createInput, done: false }]);
    setIsOpenCreate(false);
    setCreateInput('');
  };

  const onToggleDone = (id: number) => {
    setTodos(
      (prev) => prev
        .map((el) => (
          el.id === id
            ? ({ ...el, done: !el.done })
            : el)),
    );
  };

  const onClickDelete = (id: number) => {
    setTodos((prev) => prev.filter((el) => (el.id !== id)));
  };

  return (
    <Container>
      <TodoHeader
        dateString={dateString}
        dayName={dayName}
        unDoneTaskLength={unDoneTaskLength}
      />
      <TodoList
        todos={todos}
        onToggleDone={onToggleDone}
        onClickDelete={onClickDelete}
      />
      <TodoCreate
        isOpen={isOpenCreate}
        onToggle={onToggleIsOpenCreate}
        onChange={onChangeCreateInput}
        onSubmit={onSubmitCreate}
        value={createInput}
      />
    </Container>
  );
};

export default Todolist3;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
