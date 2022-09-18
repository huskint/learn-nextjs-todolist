import React, { memo } from 'react';
import styled from 'styled-components';

import { TodoItem } from '@components/todo/index';

import { TodoItemType } from '../../../lib/interface/todo.interface';

interface Props {
  todos: TodoItemType[];
  onToggleDone: (id: number, done: boolean) => void;
  onClickDelete: (id: number) => void;
}

const TodoList = ({
  todos,
  onToggleDone,
  onClickDelete,
}: Props) => (
  <Container>
    {
      todos.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
          onToggleDone={onToggleDone}
          onClickDelete={onClickDelete}
        />
      ))
    }
  </Container>
);

export default memo(TodoList);

const Container = styled.div`
  flex: 1;
  padding: 20px 32px 48px 32px;
  overflow-y: auto;
`;
