import Decimal from 'decimal.js-light';

import { formatPriceQuantity } from '@/utils/formatPriceQuantity';

import type { OrderBookProps } from './book.types';
import { COLOR_ORDER } from './book.utils';

export const BookOrders = ({ orders, type }: OrderBookProps) => {
  return (
    <div
      className={`mt-2 flex ${type.match('ask') ? 'flex-col-reverse' : 'flex-col'}`}
    >
      {orders.map((book, index) => {
        const amount = new Decimal(book.price).mul(book.quantity).toNumber();
        const price = formatPriceQuantity(book.price);

        const quantity = new Decimal(book.quantity)
          .toDecimalPlaces(5, Decimal.ROUND_DOWN)
          .toFixed(5);

        return (
          <div
            key={index}
            className="relative flex flex-1 cursor-pointer flex-row overflow-hidden hover:bg-zinc-800"
          >
            <div className="order-row z-10 flex flex-1 gap-3 px-4">
              <span
                className="flex-1 text-left"
                style={{ color: COLOR_ORDER[type] }}
              >
                {price}
              </span>
              <span className="flex-1 text-right text-xs text-gray-200">
                {quantity}
              </span>
              <span className="flex-1 text-right text-xs text-gray-200">
                {amount.toFixed(2)}
                {/* {new Intl.NumberFormat('en-US', { style: 'decimal', currency: 'USD' }).format(amount)} */}
              </span>
            </div>

            <div
              className={`absolute right-0 z-0 h-full opacity-20`}
              style={{
                background: COLOR_ORDER[type],
                width: `${book.percentage?.toNumber()}%`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
