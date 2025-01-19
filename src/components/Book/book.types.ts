import type Decimal from 'decimal.js-light';

export enum OrderBookType {
  ASK = 'ask',
  BID = 'bid',
}
export interface OrderBookProps {
  orders: Order[];
  type: OrderBookType;
}

export interface Order {
  price: string;
  quantity: string;
  percentage?: Decimal;
}

export interface OrderBookState {
  [OrderBookType.ASK]: Order[];
  [OrderBookType.BID]: Order[];
}
