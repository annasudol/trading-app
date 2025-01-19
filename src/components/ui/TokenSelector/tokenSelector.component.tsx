import { Select, SelectItem } from '@nextui-org/react';
import { useDispatch } from 'react-redux';

import { TokenIcon, TokenIconType } from '@/components/ui/TokenIcon';
import { updateToken0 } from '@/store/slices/tradePair';

export default function TokenSelectorComponent() {
  const tokens = [
    TokenIconType.BTC,
    TokenIconType.ETH,
    TokenIconType.SOL,
    TokenIconType.AVAX,
    TokenIconType.XRP,
  ];
  const dispath = useDispatch();
  return (
    <Select className="max-w-xs" label="Change trading pair">
      {tokens.map((token) => (
        <SelectItem
          key={token}
          startContent={<TokenIcon.Component token={token} />}
          value={`${token}${TokenIconType.USDT}`}
          onPress={() => dispath(updateToken0(token))}
        >
          {token}/{TokenIconType.USDT}
        </SelectItem>
      ))}
    </Select>
  );
}
