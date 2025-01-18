import type Decimal from 'decimal.js-light';

export enum OrderBookType {
  BID = 'bid',
  ASK = 'asks',
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
  bid: Order[];
  asks: Order[];
}
