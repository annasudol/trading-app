import { useDispatch } from 'react-redux';

import { TokenIconType } from '@/components/ui/TokenIcon';
import { updateToken0 } from '@/store/slices/tradePair';

export const TokenSelector = () => {
  const tokens = [
    TokenIconType.BTC,
    TokenIconType.ETH,
    TokenIconType.SOL,
    TokenIconType.AVAX,
    TokenIconType.XRP,
  ];
  const dispath = useDispatch();
  function handleUpdateToken(value: string) {
    dispath(updateToken0(value as TokenIconType));
  }
  return (
    <form>
      <select
        className="ease w-full cursor-pointer appearance-none rounded border border-slate-300 py-2 pl-3 pr-8 text-sm text-slate-300 focus:border-slate-500 focus:outline-none focus:ring-0"
        onChange={(e) => handleUpdateToken(e.target.value)}
      >
        {tokens.map((token) => (
          <option key={token} value={token}>
            {token}
          </option>
        ))}
      </select>
    </form>
  );
};
