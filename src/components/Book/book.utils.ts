export enum OrderBookType {
  ASK = 'ask',
  BID = 'bid',
}

export const COLOR_ORDER = {
  [OrderBookType.ASK]: '#0ECB81',
  [OrderBookType.BID]: '#F64670',
};
