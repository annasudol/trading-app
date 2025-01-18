import { Loading } from '../ui/Loading';
import { useChart } from './chart.hook';

export function ChartComponent() {
  const { isLoading, chartContainerRef } = useChart();

  if (isLoading) return <Loading />;

  return (
    <div
      ref={chartContainerRef}
      className="flex min-h-96 flex-1 justify-center overflow-hidden rounded-lg"
    />
  );
}
