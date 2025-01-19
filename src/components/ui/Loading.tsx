import { Spinner } from '@nextui-org/react';

const Loading = () => {
  return (
    <div className="flex min-h-[50vh] w-full flex-col items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
};
export { Loading };
