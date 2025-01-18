export const formatPrice = (price: number) => {
  const fractionDigits = price.toString().split('.')[1]?.length;
  const defaultFractionDigits = 2;
  const minimumFractionDigits =
    (fractionDigits ?? 0) > 1 ? fractionDigits : defaultFractionDigits;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits,
  }).format(price);
};
