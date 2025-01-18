import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { TokenSymbol } from '@/components/ui/TokenIcon';

const initialState = {
  token0: TokenSymbol.BTC,
  token1: TokenSymbol.USDT,
};

const tradePair = createSlice({
  name: 'pair',
  initialState,
  reducers: {
    updateToken0(state, action: PayloadAction<TokenSymbol>) {
      return { ...state, token0: action.payload };
    },
    updateToken1(state, action: PayloadAction<TokenSymbol>) {
      return { ...state, token1: action.payload };
    },
  },
});

export const { updateToken0, updateToken1 } = tradePair.actions;
export default tradePair.reducer;
