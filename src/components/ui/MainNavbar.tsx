import { Link, Navbar } from '@nextui-org/react';

import { TokenIcon } from '@/components/ui/TokenIcon';
import { AppConfig } from '@/config/AppConfig';
import { useAppSelector } from '@/hooks/useRedux';

const MainNavbar = () => {
  const SYMBOL = useAppSelector((state) => state.symbol);

  return (
    <Navbar className="w-full" shouldHideOnScroll>
      <div className="mx-auto flex h-11 w-full flex-wrap items-center justify-between">
        <nav className="py-6">
          <Link href="/">{AppConfig.emoji}</Link>
        </nav>
        <div className="flex items-center">
          {SYMBOL && SYMBOL[0] && <TokenIcon token={SYMBOL[0]} size={30} />}
          <p className="text-md ml-2 font-medium">
            {SYMBOL[0]}
            {SYMBOL[1]}
          </p>
        </div>
      </div>
    </Navbar>
  );
};

export { MainNavbar };
