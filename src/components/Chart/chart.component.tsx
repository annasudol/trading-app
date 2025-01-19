import { Loading } from '../ui/Loading';
import { useChart } from './chart.hook';

export function ChartComponent() {
  const { isLoading, chartContainerRef } = useChart();

  if (isLoading) return <Loading.Component />;

  return (
    <div
      ref={chartContainerRef}
      className="mt-2 flex min-h-[500px] justify-center overflow-hidden rounded-lg"
    />
  );
}
