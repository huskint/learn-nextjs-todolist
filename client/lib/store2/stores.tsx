import React, { createContext, useContext } from 'react';

import todoStore from './todoStore';
import userStore from './userStore';

const stores = {
  todoStore,
  userStore,
};

const TodoContext = createContext(stores);

export function TodoStoreProvider({ children }: any) {
  return (
    <TodoContext.Provider value={stores}>
      {children}
    </TodoContext.Provider>
  );
}

export const useTodoStores = () => useContext(TodoContext);
