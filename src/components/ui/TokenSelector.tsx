import { Select, SelectItem } from '@nextui-org/react';
import { useDispatch } from 'react-redux';

import { updateToken0 } from '@/store/slices/tradePair';

import { TokenIcon, TokenSymbol } from './TokenIcon';

export default function TokenSelector() {
  const tokens = [TokenSymbol.BTC, TokenSymbol.ETH, TokenSymbol.SOL];
  const dispath = useDispatch();
  return (
    <Select className="max-w-xs" label="Change trading pair">
      {tokens.map((token) => (
        <SelectItem
          key={token}
          startContent={<TokenIcon token={token} />}
          value={`${token}${TokenSymbol.USDT}`}
          onPress={() => dispath(updateToken0(token))}
        >
          {token}/{TokenSymbol.USDT}
        </SelectItem>
      ))}
    </Select>
  );
}
