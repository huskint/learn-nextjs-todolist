import React, { ChangeEvent, FormEvent, useState } from 'react';

import { TodoCreate, TodoHeader } from '@components/todo';

import getDateString from '../lib/utils/getDateString';

const { dateString, dayName } = getDateString();

const Todolist1 = () => {
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [createInput, setCreateInput] = useState('');

  const onToggleIsOpenCreate = () => {
    setIsOpenCreate((prev) => !prev);
  };

  const onChangeCreateInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCreateInput(value);
  };

  const onSubmitCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsOpenCreate(false);
    setCreateInput('');
  };

  return (
    <div>
      <TodoHeader
        dateString={dateString}
        dayName={dayName}
        unDoneTaskLength={0}
      />
      <TodoCreate
        isOpen={isOpenCreate}
        onToggle={onToggleIsOpenCreate}
        onChange={onChangeCreateInput}
        onSubmit={onSubmitCreate}
        value={createInput}
      />
    </div>
  );
};

export default Todolist1;
