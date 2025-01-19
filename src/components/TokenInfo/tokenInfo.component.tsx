import { cn } from '@nextui-org/theme';
import { useEffect, useMemo, useState } from 'react';

import { useAppSelector } from '@/store/hooks/useRedux';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';

import { useTokenInfo } from './tokenInfo.hook';

export function TokenInfoComponent() {
  const { cryptoData } = useTokenInfo();
  const { token0, token1 } = useAppSelector((state) => state.tradePair);
  const [color, setColor] = useState<'text-green-400' | 'text-red-400'>();
  useEffect(() => {
    if (cryptoData) {
      setColor(
        parseFloat(cryptoData?.change) > 0 ? 'text-green-400' : 'text-red-400',
      );
    }
  }, [cryptoData]);

  const tradingPair = useMemo(() => `${token0}/${token1}`, [token0, token1]);

  return (
    <div className="flex items-center justify-between rounded-md bg-zinc-900 p-2">
      <p>{tradingPair}</p>
      {cryptoData &&
        Object.entries(cryptoData).map(([key, value]) => {
          return (
            <div key={key} className="flex flex-col items-end">
              <p className="text-xs">{capitalizeFirstLetter(key)}</p>
              <p className={cn(key === 'price' ? color : 'text-zinc-100')}>
                {value}
              </p>
            </div>
          );
        })}
    </div>
  );
}
