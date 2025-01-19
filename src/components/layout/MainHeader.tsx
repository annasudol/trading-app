import { useAppSelector } from '@/hooks/useRedux';

import { TokenIcon } from '../ui/TokenIcon';
import { TokenSelector } from '../ui/TokenSelector';

const MainHeader = () => {
  const { token0, token1 } = useAppSelector((state) => state.tradePair);

  return (
    <header>
      <div className="mx-auto max-w-screen-lg px-2">
        <div className="flex items-center justify-start">
          {token0 && <TokenIcon token={token0} size={30} />}
          <p className="text-md mx-2 font-medium text-zinc-100">
            {token0}/{token1}
          </p>
          <TokenSelector />
        </div>
      </div>
    </header>
  );
};

export { MainHeader };
