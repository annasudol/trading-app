import { Spinner } from '@nextui-org/react';

export const LoadingComponent = () => {
  return (
    <div className="flex min-h-[50vh] w-full flex-col items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
};
