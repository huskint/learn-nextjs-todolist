import React, { ChangeEvent, FormEvent, memo } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  isOpen: boolean;
  onToggle: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  value: string;
}

const TodoCreate = ({
  isOpen, onToggle, onChange, onSubmit, value,
}: Props) => (
  <>
    <CreateButton isOpen={isOpen} onClick={onToggle}>
      { isOpen ? '닫기' : '추가' }
    </CreateButton>
    {
      isOpen && (
        <CreateContainer>
          <CreateForm
            onSubmit={onSubmit}
          >
            <Input
              autoFocus
              placeholder="입력 후, Enter를 누르세요."
              onChange={onChange}
              value={value}
            />
          </CreateForm>
        </CreateContainer>
      )
    }
  </>
);

export default memo(TodoCreate);

const CreateButton = styled.button<{ isOpen: boolean }>`
  width: 60px;
  height: 40px;
  position: absolute;
  right: 20px;
  bottom: 20px;
  background-color: #2478ff;
  font-size: 20px;
  color: white;
  border-radius: 6px;
  border: none;
  outline: none;
  cursor: pointer;
  z-index: 5;
  transition: 0.125s all ease-in;
  ${(props) => props.isOpen && css`
      background-color: #fff;
      color: #222;
    border: 1px solid #ddd;
  `}
`;

const CreateContainer = styled.div`
  position: absolute;
  width: 100%;
  height: auto;
  bottom: 0;
  left: 0;
`;

const CreateForm = styled.form`
  background: #f8f9fa;
  padding: 32px 32px 72px 32px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;
