import type {
  CandlestickData,
  IChartApi,
  ISeriesApi,
} from 'lightweight-charts';
import { createChart, CrosshairMode } from 'lightweight-charts';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { BASE_URL_SOCKET } from 'src/constants/url';

import { useAppSelector } from '@/hooks/useRedux';
import { useGetKlinesQuery } from '@/service/binance/api';
import { timeToTimeZone } from '@/utils/timeToTimeZone';

import { colors } from './chart.utils';

export const useChart = () => {
  const { token0, token1 } = useAppSelector((state) => state.tradePair);

  const tradingPair = useMemo(() => `${token0}${token1}`, [token0, token1]);

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const { data: listDataKlines, isLoading } = useGetKlinesQuery({
    symbol: tradingPair,
    interval: '1m',
  });

  const handleChart = useCallback(() => {
    if (!chartContainerRef.current) return;

    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
      candleSeriesRef.current = null;
    }

    if (!chartRef.current) {
      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { color: colors.background },
          textColor: colors.text,
        },
        rightPriceScale: {
          borderColor: colors.neutral,
          scaleMargins: { top: 0.3, bottom: 0.25 },
          entireTextOnly: true,
        },
        grid: {
          vertLines: { color: colors.neutral },
          horzLines: { color: colors.neutral },
        },
        crosshair: { mode: CrosshairMode.Normal },
        timeScale: {
          borderColor: colors.neutral,
          timeVisible: true,
          secondsVisible: false,
        },
      });

      const candleSeries = chart.addCandlestickSeries({
        upColor: colors.green,
        downColor: colors.red,
        borderDownColor: colors.red,
        borderUpColor: colors.green,
        wickDownColor: colors.red,
        wickUpColor: colors.green,
      });

      candleSeriesRef.current = candleSeries;
      chartRef.current = chart;
    }

    const klinesData: CandlestickData<any>[] =
      listDataKlines?.map((kline) => {
        const [time, open, high, low, close] = kline;

        return {
          time: timeToTimeZone({ originalTime: String(time) }),
          open: parseFloat(String(open)),
          high: parseFloat(String(high)),
          low: parseFloat(String(low)),
          close: parseFloat(String(close)),
        };
      }) || [];

    if (candleSeriesRef.current) {
      candleSeriesRef.current.setData(klinesData);
      const latestData = klinesData[klinesData.length - 1];
      if (latestData) {
        chartRef.current.timeScale().scrollToPosition(0, true);
      }
    }
  }, [tradingPair, listDataKlines]);

  const handleResize = useCallback(() => {
    if (chartRef.current && chartContainerRef.current) {
      const width = chartContainerRef.current.clientWidth;
      const height = chartContainerRef.current.clientHeight;
      chartRef.current.resize(width, height);
    }
  }, []);

  useEffect(() => {
    handleChart();

    const resizeObserver = new ResizeObserver(handleResize);
    if (chartContainerRef.current) resizeObserver.observe(document.body);

    window.addEventListener('resize', handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [tradingPair, handleChart, handleResize]);

  const connectWebSocket = () => {
    const ws = new WebSocket(
      `${BASE_URL_SOCKET}/ws/${tradingPair.toLowerCase()}@kline_1m`,
    );

    ws.onmessage = (event: MessageEvent) => {
      const lastJsonMessage = JSON.parse(event.data);

      const klinesData: CandlestickData<any> = {
        time: timeToTimeZone({
          originalTime: String(lastJsonMessage.k.t),
        }),
        open: parseFloat(String(lastJsonMessage.k.o)),
        high: parseFloat(String(lastJsonMessage.k.h)),
        low: parseFloat(String(lastJsonMessage.k.l)),
        close: parseFloat(String(lastJsonMessage.k.c)),
      };

      if (candleSeriesRef.current) candleSeriesRef.current.update(klinesData);
    };

    ws.onerror = () => {
      ws.close();
    };

    wsRef.current = ws;
  };

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
  }, [tradingPair]);

  return { isLoading, chartContainerRef };
};
