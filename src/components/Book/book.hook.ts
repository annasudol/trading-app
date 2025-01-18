import { Decimal } from 'decimal.js-light';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BASE_URL_SOCKET } from 'src/constants/url';
import { useAppSelector } from 'src/hooks/useRedux';

import { useGetBookQuery } from '@/service/binance/api';

import type { Order, OrderBookState } from './book.types';
import { OrderBookType } from './book.types';

const LEVELS = 10;

export const useBook = () => {
  const { token0, token1 } = useAppSelector((state) => state.tradePair);

  const tradingPair = useMemo(() => `${token0}${token1}`, [token0, token1]);

  const { data: initialBookData, isLoading } = useGetBookQuery({
    symbol: tradingPair.toUpperCase(),
    limit: LEVELS,
  });

  const [orderBook, setOrderBook] = useState<OrderBookState>({
    bid: [],
    asks: [],
  });
  const [midPrice, setMidPrice] = useState(new Decimal(0));
  const [midPriceType, setMidPriceType] = useState<OrderBookType>();

  const wsRef = useRef<WebSocket | null>(null);

  const calculatePercentages = (orders: Order[]) => {
    const totalQuantity = orders.reduce(
      (total, order) => new Decimal(total).add(order.quantity).toNumber(),
      0,
    );

    return orders.map((order) => ({
      ...order,
      percentage: new Decimal(order.quantity)
        .div(totalQuantity)
        .mul(100)
        .times(10),
    }));
  };

  const initializeOrderBook = (data: any) => {
    const bids = data.bids.map(([price, quantity]: [string, string]) => ({
      price,
      quantity,
    }));
    const asks = data.asks.map(([price, quantity]: [string, string]) => ({
      price,
      quantity,
    }));

    setOrderBook({
      bid: calculatePercentages(bids),
      asks: calculatePercentages(asks),
    });

    if (bids.length > 0 && asks.length > 0) {
      const highestBid = parseFloat(bids[0].price);
      const lowestAsk = new Decimal(asks[0].price);
      const midPriceCalc = new Decimal(highestBid).add(lowestAsk).div(2);

      setMidPrice(midPriceCalc);
      setMidPriceType(
        midPriceCalc.sub(highestBid).lessThan(lowestAsk.sub(midPriceCalc))
          ? OrderBookType.BID
          : OrderBookType.ASK,
      );
    }
  };

  const updateOrderBook = useCallback(
    (prevOrders: Order[], updates: [string, string][], type: OrderBookType) => {
      const orders = [...prevOrders];
      updates.forEach(([price, quantity]) => {
        const index = orders.findIndex((order) => order.price === price);
        if (parseFloat(quantity) === 0) {
          if (index >= 0) orders.splice(index, 1);
        } else if (index >= 0 && orders[index]) {
          orders[index].quantity = quantity;
        } else {
          orders.push({ price, quantity });
        }
      });

      orders.sort((a, b) =>
        type === 'bid'
          ? parseFloat(b.price) - parseFloat(a.price)
          : parseFloat(a.price) - parseFloat(b.price),
      );

      return calculatePercentages(orders).slice(0, LEVELS);
    },
    [],
  );

  const connectWebSocket = useCallback(() => {
    const ws = new WebSocket(
      `${BASE_URL_SOCKET}/ws/${tradingPair.toLowerCase()}@depth`,
    );

    ws.onmessage = (event) => {
      const { b, a } = JSON.parse(event.data);
      setOrderBook((prevOrderBook) => ({
        bid: updateOrderBook(prevOrderBook.bid, b, OrderBookType.BID),
        asks: updateOrderBook(prevOrderBook.asks, a, OrderBookType.ASK),
      }));

      if (a.length > 0 && b.length > 0) {
        const highestBid = parseFloat(b[0][0]);
        const lowestAsk = new Decimal(parseFloat(a[0][0]));
        const midPriceCalc = new Decimal(highestBid).add(lowestAsk).div(2);

        setMidPrice(midPriceCalc);
        setMidPriceType(
          midPriceCalc
            .sub(highestBid)
            .lessThanOrEqualTo(lowestAsk.sub(midPriceCalc))
            ? OrderBookType.BID
            : OrderBookType.ASK,
        );
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      ws.close();
    };

    wsRef.current = ws;
  }, [tradingPair, updateOrderBook]);

  useEffect(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [tradingPair, connectWebSocket]);

  useEffect(() => {
    if (initialBookData) initializeOrderBook(initialBookData);
  }, [initialBookData]);

  return {
    isLoading,
    orderBook,
    midPrice,
    midPriceType,
  };
};
