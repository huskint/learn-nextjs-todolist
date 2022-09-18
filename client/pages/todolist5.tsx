import React, {
  ChangeEvent, FormEvent, useEffect, useMemo, useState,
} from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

import { TodoCreate, TodoHeader, TodoList } from '@components/todo';

import getDateString from '../lib/utils/getDateString';
import todoStore from '../lib/store2/todoStore';

const { dateString, dayName } = getDateString();

const Todolist3 = () => {
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [createInput, setCreateInput] = useState('');

  const unDoneTaskLength = useMemo(() => todoStore.todo.filter((todo) => !todo.done).length, [todoStore.todo]);

  const onToggleIsOpenCreate = () => {
    setIsOpenCreate((prev) => !prev);
  };

  const onChangeCreateInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCreateInput(value);
  };

  const onSubmitCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    todoStore.createTodo(createInput);
    setIsOpenCreate(false);
    setCreateInput('');
  };

  const onToggleDone = (id: number, done: boolean) => {
    todoStore.toggleDone(id, done);
  };

  const onClickDelete = (id: number) => {
    todoStore.deleteTodo(id);
  };

  useEffect(() => {
    todoStore.getTodo();
  }, []);

  useEffect(() => {
    console.log(toJS(todoStore.todo));
  }, [todoStore.todo]);

  return (
    <Container>
      <Link href="/todolist1">투두리스트1</Link>
      <TodoHeader
        dateString={dateString}
        dayName={dayName}
        unDoneTaskLength={unDoneTaskLength}
      />
      <TodoList
        todos={todoStore.todo}
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

export default observer(Todolist3);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
