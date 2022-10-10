import React, {
  ChangeEvent, FormEvent, useEffect, useMemo, useState,
} from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';

import { TodoCreate, TodoHeader, TodoList } from '@components/todo';

import getDateString from '../lib/utils/getDateString';
import { useTodoStores } from '../lib/store2/stores';

const { dateString, dayName } = getDateString();

const Todolist3 = () => {
  const router = useRouter();
  const { todoStore, userStore } = useTodoStores();
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

  const onClickLogout = () => {
    localStorage.clear();
    router.replace('/auth/signin');
  };

  useEffect(() => {
    (async () => {
      const isAuth = await userStore.getAuthUser();
      if (!isAuth) {
        alert('회원 정보가 없습니다.');
        router.replace('/auth/signin');
      }
    })();
  }, []);

  useEffect(() => {
    todoStore.getTodo();
  }, []);

  return (
    <Container>
      <LogoutButton onClick={onClickLogout}>로그아웃</LogoutButton>
      <TodoHeader
        email={userStore.user?.email}
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

const LogoutButton = styled.button`
  width: 100px;
`;
