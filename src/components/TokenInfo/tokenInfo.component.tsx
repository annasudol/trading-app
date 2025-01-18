import { useMemo } from 'react';

import { useAppSelector } from '@/hooks/useRedux';

import { useTokenInfo } from './tokenInfo.hook';

export function TokenInfoComponent() {
  const { cryptoData } = useTokenInfo();
  const { token0, token1 } = useAppSelector((state) => state.tradePair);

  const tradingPair = useMemo(() => `${token0}/${token1}`, [token0, token1]);

  return (
    <div className="flex items-center justify-center rounded-md bg-slate-800 py-2">
      <p className="text-white"> {tradingPair}</p>
      {cryptoData &&
        Object.entries(cryptoData).map(([key, value]) => (
          <div key={key}>
            <p className="px-4 text-xs text-gray-500">{key}</p>
            <p className="px-4 text-xs text-gray-200">{value}</p>
          </div>
        ))}
    </div>
  );
}
