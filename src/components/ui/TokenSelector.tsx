import { Select, SelectItem } from '@nextui-org/react';

import { TokenIcon, TokenSymbol } from './TokenIcon';

export default function TokenSelector() {
  const tokens = [TokenSymbol.BTC, TokenSymbol.ETH, TokenSymbol.SOL];
  return (
    <Select className="max-w-xs" label="Change trading pair">
      {tokens.map((token) => (
        <SelectItem key={token} startContent={<TokenIcon token={token} />}>
          {token}/{TokenSymbol.USDT}
        </SelectItem>
      ))}
    </Select>
  );
}
