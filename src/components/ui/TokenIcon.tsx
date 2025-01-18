import { cn, Image } from '@nextui-org/react';

export enum TokenSymbol {
  BTC = 'BTC',
  ETH = 'ETH',
  SOL = 'SOL',
  USDT = 'USDT',
}

const tokenIcons: Record<TokenSymbol, string> = {
  [TokenSymbol.BTC]: '/icons/btc.png',
  [TokenSymbol.ETH]: '/icons/eth.png',
  [TokenSymbol.SOL]: '/icons/sol.png',
  [TokenSymbol.USDT]: '/icons/tether.png',
};

interface TokenIconProps {
  token: TokenSymbol;
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
