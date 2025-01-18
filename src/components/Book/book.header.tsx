export const BookHeader = () => {
  return (
    <div className="flex gap-3 px-4 pt-4 text-sm text-zinc-400">
      <span className="flex-1 overflow-hidden text-ellipsis text-left">
        Price
      </span>
      <span className="flex-1 overflow-hidden text-ellipsis text-right">
        Quantity
      </span>
      <span className="flex-1 overflow-hidden text-ellipsis text-right">
        Total
      </span>
    </div>
  );
};
