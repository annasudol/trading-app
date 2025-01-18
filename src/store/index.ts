import { configureStore } from '@reduxjs/toolkit';

import { binanceApi } from '@/service/binance/api';

import tradePair from './slices/tradePair';

export const store = configureStore({
  reducer: {
    tradePair,
    [binanceApi.reducerPath]: binanceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(binanceApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
