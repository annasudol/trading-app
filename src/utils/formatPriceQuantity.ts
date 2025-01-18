import Decimal from 'decimal.js-light';

export const formatPriceQuantity = (price: string) => {
  const fractionDigits = price
    .replace(/\.?0+$/, '')
    .toString()
    .split('.')[1]?.length;

  const minFractionDigits = 2;
  const maxFractionDigits = 5;
  const decimalPlaces =
    (fractionDigits ?? 0) > 2 && new Decimal(price).lessThanOrEqualTo(1)
      ? maxFractionDigits
      : minFractionDigits;

  return new Decimal(price)
    .toDecimalPlaces(8)
    .toDecimalPlaces(decimalPlaces, Decimal.ROUND_DOWN)
    .toNumber()
    .toFixed(decimalPlaces);
};
