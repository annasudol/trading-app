import { TokenIcon } from '@/components/ui/TokenIcon';
import { TokenSelector } from '@/components/ui/TokenSelector';
import { useAppSelector } from '@/store/hooks/useRedux';

export const HeaderComponent = () => {
  const { token0, token1 } = useAppSelector((state) => state.tradePair);
  return (
    <header className="mx-auto mb-4 flex w-full max-w-4xl items-center justify-start px-2">
      <div className="flex w-44 items-center justify-start">
        {token0 && <TokenIcon.Component token={token0} size={30} />}
        <p className="text-md font-medium">
          {token0} / {token1}
        </p>
      </div>
      <TokenSelector.Component />
    </header>
  );
};
