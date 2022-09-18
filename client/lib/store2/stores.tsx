import React, { createContext, useContext } from 'react';

import todoStore from './todoStore';

const stores = {
  todoStore,
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
