import { cn, Image } from '@nextui-org/react';

export enum TokenIconType {
  BTC = 'BTC',
  ETH = 'ETH',
  SOL = 'SOL',
  USDT = 'USDT',
  XRP = 'XRP',
  AVAX = 'AVAX',
}

const tokenIcons: Record<TokenIconType, string> = {
  [TokenIconType.BTC]: '/icons/btc.png',
  [TokenIconType.ETH]: '/icons/eth.png',
  [TokenIconType.SOL]: '/icons/sol.png',
  [TokenIconType.USDT]: '/icons/tether.png',
  [TokenIconType.XRP]: '/icons/xrp.png',
  [TokenIconType.AVAX]: '/icons/avalanche.png',
};

interface TokenIconProps {
  token: TokenIconType;
  className?: string;
  size?: number;
}

export function TokenIcon({ token, className, size = 50 }: TokenIconProps) {
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
