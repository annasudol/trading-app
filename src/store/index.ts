import { configureStore } from '@reduxjs/toolkit';

import tradePair from './slices/tradePair';

export const store = configureStore({
  reducer: tradePair,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
