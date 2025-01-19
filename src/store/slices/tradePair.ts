import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { TokenIconType } from '@/components/ui/TokenIcon';

const initialState = {
  token0: TokenIconType.BTC,
  token1: TokenIconType.USDT,
};

const tradePair = createSlice({
  name: 'pair',
  initialState,
  reducers: {
    updateToken0(state, action: PayloadAction<TokenIconType>) {
      return { ...state, token0: action.payload };
    },
    updateToken1(state, action: PayloadAction<TokenIconType>) {
      return { ...state, token1: action.payload };
    },
  },
});

export const { updateToken0, updateToken1 } = tradePair.actions;
export default tradePair.reducer;
