import React, {
  ChangeEvent, FormEvent, useMemo, useRef, useState,
} from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { TodoCreate, TodoHeader, TodoList } from '@components/todo';

import getDateString from '../lib/utils/getDateString';
import { TodoItemType } from '../lib/interface/todo.interface';

const { dateString, dayName } = getDateString();

const Todolist1 = () => {
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
      <Link href="/todolist3">투두리스트3</Link>
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

export default Todolist1;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
