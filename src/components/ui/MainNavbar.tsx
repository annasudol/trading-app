import { Link, Navbar } from '@nextui-org/react';

import { TokenIcon } from '@/components/ui/TokenIcon';
import { AppConfig } from '@/config/AppConfig';
import { useAppSelector } from '@/hooks/useRedux';

import TokenSelector from './TokenSelector';

const MainNavbar = () => {
  const { token0, token1 } = useAppSelector((state) => state.tradePair);

  return (
    <Navbar className="w-full" shouldHideOnScroll>
      <div className="mx-auto flex h-11 w-full flex-wrap items-center justify-between">
        <nav className="py-6">
          <Link href="/">{AppConfig.emoji}</Link>
        </nav>
        <div className="flex min-w-96 items-center">
          <div className="flex w-56 items-center">
            {token0 && <TokenIcon token={token0} size={30} />}
            <p className="text-md ml-2 font-medium">
              {token0}
              {token1}
            </p>
          </div>
          <TokenSelector />
        </div>
      </div>
    </Navbar>
  );
};

export { MainNavbar };
