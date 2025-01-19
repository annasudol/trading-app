import { cn, Image } from '@nextui-org/react';

import { TokenIconType } from './tokenIcon.types';

const tokenIcons: Record<TokenIconType, string> = {
  [TokenIconType.BTC]: '/icons/btc.png',
  [TokenIconType.ETH]: '/icons/eth.png',
  [TokenIconType.SOL]: '/icons/sol.png',
  [TokenIconType.USDT]: '/icons/tether.png',
  [TokenIconType.AVAX]: '/icons/avalanche.png',
  [TokenIconType.XRP]: '/icons/xrp.png',
};

interface TokenIconProps {
  token: TokenIconType;
  className?: string;
  size?: number;
}

export function TokenIconComponent({
  token,
  className,
  size = 50,
}: TokenIconProps) {
  return (
    <Image
      alt={`${token}'s icon`}
      src={tokenIcons[token]}
      width={size}
      height={size}
      className={cn(className, 'rounded-full bg-white')}
    />
  );
}
