import { useMemo } from 'react';

import { useAppSelector } from '@/hooks/useRedux';

import { useTokenInfo } from './tokenInfo.hook';

export function TokenInfoComponent() {
  const { isLoading } = useTokenInfo();
  const { token0, token1 } = useAppSelector((state) => state.tradePair);

  const tradingPair = useMemo(() => `${token0}/${token1}`, [token0, token1]);
  if (isLoading)
    return (
      <div className="min-w-sm flex flex-1 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-sm shadow-md sm:max-w-md">
        <div className="size-10 animate-spin rounded-full border-8 border-zinc-800 border-t-teal-500" />
      </div>
    );

  return (
    <div className="grid grid-cols-3 gap-4">{tradingPair}</div>
    // <div className="min-w-sm flex-1 rounded-lg border border-zinc-800 bg-zinc-900 text-sm shadow-md sm:max-w-md">
    //   <Book.Header symbol={symbol} />

    //   <div className="flex flex-col pb-4">
    //     <Book.Orders orders={orderBook.asks} type="asks" />

    //     <span className="my-4 flex w-full flex-1 items-center pl-4 text-left text-lg font-bold ">
    //       <div
    //         className={`${midPriceType === 'bid' ? 'text-green-400' : 'text-red-400'}`}
    //       >
    //         {formatPriceQuantity(midPrice.toString())}
    //       </div>

    //       <div className="text-sm">
    //         {midPriceType === 'bid' ? (
    //           <ArrowUp width={18} color={COLOR_ORDER.bids} />
    //         ) : (
    //           <ArrowDown width={18} color={COLOR_ORDER.asks} />
    //         )}
    //       </div>
    //     </span>

    //     <Book.Orders orders={orderBook.bids} type="bids" />
    //   </div>
    // </div>
  );
}
