import { Loading } from '../ui/Loading';
import { useChart } from './chart.hook';

export function ChartComponent() {
  const { isLoading, chartContainerRef } = useChart();

  if (isLoading) return <Loading />;

  return (
    <div
      ref={chartContainerRef}
      className="flex min-h-[600px] justify-center overflow-hidden rounded-lg"
    />
  );
}
