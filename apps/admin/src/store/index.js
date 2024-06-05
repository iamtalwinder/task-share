import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';

export const makeStore = (preloadedState) => {
  const store = configureStore({
    reducer,
    preloadedState,
  });

  return store;
};

export const store = makeStore();
