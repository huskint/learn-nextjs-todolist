import React, {
  ChangeEvent, FormEvent, useEffect, useMemo, useState,
} from 'react';
import styled from 'styled-components';

import { TodoCreate, TodoHeader, TodoList } from '@components/todo';

import getDateString from '../lib/utils/getDateString';
import { getTodoList } from '../lib/api/todo/getTodoList';
import { TodoItem } from '../lib/interface/todo.interface';
import { postTodoList } from '../lib/api/todo/postTodoList';
import { patchTodoList } from '../lib/api/todo/patchTodoList';
import { deleteTodoList } from '../lib/api/todo/deleteTodoList';

const { dateString, dayName } = getDateString();

const Todolist2 = () => {
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [createInput, setCreateInput] = useState('');
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const unDoneTaskLength = useMemo(() => todos.filter((todo) => !todo.done).length, [todos]);

  const onToggleIsOpenCreate = () => {
    setIsOpenCreate((prev) => !prev);
  };

  const onChangeCreateInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCreateInput(value);
  };

  const onSubmitCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addTodo();
    await getTodos();
    // setTodos((prev) => [...prev, { id: nextId.current, text: createInput, done: false }]);
    setIsOpenCreate(false);
    setCreateInput('');
  };

  const onToggleDone = async (id: number, done: boolean) => {
    await doneTodo(id, done);
    await getTodos();
    // setTodos(
    //   (prev) => prev
    //     .map((el) => (
    //       el.id === id
    //         ? ({ ...el, done: !el.done })
    //         : el)),
    // );
  };

  const onClickDelete = async (id: number) => {
    await deleteTodo(id);
    await getTodos();
    // setTodos((prev) => prev.filter((el) => (el.id !== id)));
  };

  const getTodos = async () => {
    try {
      const data = await getTodoList();
      setTodos(data);
    } catch (e) {
      alert('오류가 발생했습니다.');
    }
  };

  const addTodo = async () => {
    try {
      const param = {
        text: createInput,
      };
      await postTodoList(param);
    } catch (e) {
      alert('오류가 발생했습니다.');
    }
  };

  const doneTodo = async (id: number, done: boolean) => {
    try {
      const param = {
        done,
      };
      await patchTodoList(id, param);
    } catch (e) {
      alert('오류가 발생했습니다.');
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await deleteTodoList(id);
    } catch (e) {
      alert('오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

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

export default Todolist2;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
