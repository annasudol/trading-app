import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { TokenSymbol } from '@/components/ui/TokenIcon';

const initialState = {
  symbol: [TokenSymbol.BTC, TokenSymbol.USD],
};

const tradePair = createSlice({
  name: 'pair',
  initialState,
  reducers: {
    updateSymbol(state, action: PayloadAction<TokenSymbol[]>) {
      return { ...state, symbol: action.payload };
    },
  },
});

export const { updateSymbol } = tradePair.actions;
export default tradePair.reducer;
