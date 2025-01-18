import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

import { formatPriceQuantity } from '@/utils/formatPriceQuantity';

import { BookHeader } from './book.header';
import { useBook } from './book.hook';
import { BookOrders } from './book.orders';
import { OrderBookType } from './book.types';

export function BookComponent() {
  const { isLoading, midPrice, midPriceType, orderBook } = useBook();
  console.log('orderBook', orderBook);

  if (isLoading)
    return (
      <div className="min-w-sm flex flex-1 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-sm shadow-md sm:max-w-md">
        <div className="size-10 animate-spin rounded-full border-8 border-zinc-800 border-t-teal-500" />
      </div>
    );

  return (
    <div className="min-w-sm flex-1 rounded-lg border border-zinc-800 bg-zinc-900 text-sm shadow-md sm:max-w-md">
      <BookHeader />

      <div className="flex flex-col pb-2">
        <BookOrders orders={orderBook.asks} type={OrderBookType.ASK} />

        <span className="my-4 flex w-full flex-1 items-center pl-4 text-left text-lg font-bold ">
          <div
            className={`${midPriceType === 'bid' ? 'text-green-400' : 'text-red-400'}`}
          >
            {formatPriceQuantity(midPrice.toString())}
          </div>

          <div className="text-sm">
            {midPriceType === 'bid' ? (
              <FaArrowUp className="text-green-400" />
            ) : (
              <FaArrowDown className="text-red-400" />
            )}
          </div>
        </span>

        <BookOrders orders={orderBook.bid} type={OrderBookType.BID} />
      </div>
    </div>
  );
}
