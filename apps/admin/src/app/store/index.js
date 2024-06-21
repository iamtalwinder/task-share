import { configureStore } from '@reduxjs/toolkit';
import createAppSlice from './create-app-slice';
import reducer from './reducer';

const makeStore = (preloadedState) => {
  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat();
    },
    preloadedState,
  });

  return store;
};

const store = makeStore();

export { store, createAppSlice };
