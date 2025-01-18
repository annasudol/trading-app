import { useMemo } from 'react';

import { useAppSelector } from '@/hooks/useRedux';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';

import { useTokenInfo } from './tokenInfo.hook';

export function TokenInfoComponent() {
  const { cryptoData } = useTokenInfo();
  const { token0, token1 } = useAppSelector((state) => state.tradePair);

  const tradingPair = useMemo(() => `${token0}/${token1}`, [token0, token1]);

  return (
    <div className="flex items-center justify-center rounded-md bg-gray-800 py-2">
      <p className="text-white"> {tradingPair}</p>
      {cryptoData &&
        Object.entries(cryptoData).map(([key, value]) => (
          <div key={key}>
            <p className="px-2 text-xs text-gray-400 xl:px-4">
              {key
                .split(' ')
                .map((el) => capitalizeFirstLetter(el))
                .join(' ')}
            </p>
            <p className="px-2 text-xs text-gray-200 xl:px-4">{value}</p>
          </div>
        ))}
    </div>
  );
}
