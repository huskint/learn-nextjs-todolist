import React, { memo } from 'react';
import styled, { css } from 'styled-components';
import { MdDelete, MdDone } from 'react-icons/md';

import { TodoItemType } from '../../../pages/todolist1';

interface Props {
  onToggleDone: (id: number, done: boolean) => Promise<void>;
  onClickDelete: (id: number) => void;
}

const TodoItem = ({
  id,
  text,
  done,
  onToggleDone,
  onClickDelete,
}: Props & TodoItemType) => (
  <Container>
    <CheckCircle done={done} onClick={() => { onToggleDone(id, !done); }}>
      {done && <MdDone />}
    </CheckCircle>
    <Text done={done}>{text}</Text>
    <Remove onClick={() => { onClickDelete(id); }}>
      <MdDelete />
    </Remove>
  </Container>
);

export default memo(TodoItem);

const Remove = styled.div`
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #2478ff;
  }
  display: none;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

const CheckCircle = styled.div<{ done: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) => props.done
  && css`
      border: 1px solid #2478ff;
      color: #2478ff;
    `}
`;

const Text = styled.div<{ done: boolean }>`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${(props) => props.done
  && css`
      color: #ced4da;
      text-decoration: line-through;
    `}
`;
