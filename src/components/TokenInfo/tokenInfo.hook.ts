import { useEffect, useMemo, useRef, useState } from 'react';
import { BASE_URL_SOCKET } from 'src/constants/url';

import { useAppSelector } from '@/hooks/useRedux';
import { useGetTickerQuery } from '@/service/binance/api';
import { formatPrice } from '@/utils/formatPrice';

import type { TokenInfo } from './tokenInfo.types';

export const useTokenInfo = () => {
  const [cryptoData, setCryptoData] = useState<TokenInfo>();
  const { token0, token1 } = useAppSelector((state) => state.tradePair);

  const tradingPair = useMemo(() => `${token0}${token1}`, [token0, token1]);

  const {
    data: initialTickerData,
    error,
    isLoading,
  } = useGetTickerQuery([tradingPair]);

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectIntervalRef = useRef<number>(1000);

  useEffect(() => {
    if (initialTickerData) {
      const initialData = initialTickerData.reduce(
        (acc: TokenInfo, item: any) => {
          return {
            ...acc,
            price: formatPrice(parseFloat(item.lastPrice)),
            change: `${parseFloat(item.priceChangePercent).toFixed(2)}%`,
            volume: item.volume,
            'low price': formatPrice(parseFloat(item.lowPrice)),
            'high price': formatPrice(parseFloat(item.highPrice)),
          };
        },
        {},
      );

      setCryptoData(initialData);
    }
  }, [initialTickerData]);

  const connectWebSocket = () => {
    const ws = new WebSocket(
      `${BASE_URL_SOCKET}/stream?streams=btcusdt@ticker/`,
    );

    ws.onmessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);
      const { data } = message;
      const token: TokenInfo = {
        price: formatPrice(parseFloat(data.c)),
        change: `${parseFloat(data.P).toFixed(2)}%`,
        volume: data.v,
        'low price': formatPrice(parseFloat(data.l)),
        'high price': formatPrice(parseFloat(data.h)),
      };

      setCryptoData(token);
    };

    ws.onclose = () => {
      reconnectIntervalRef.current = Math.min(
        reconnectIntervalRef.current * 2,
        30000,
      );
      setTimeout(() => connectWebSocket(), reconnectIntervalRef.current);
    };

    ws.onerror = () => {
      ws.close();
    };

    wsRef.current = ws;
  };

  useEffect(() => {
    if (!isLoading && !error && initialTickerData) {
      connectWebSocket();
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [initialTickerData, isLoading, error]);

  return { cryptoData };
};
