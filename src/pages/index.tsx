import React from 'react';

import { Chart } from '@/components/Chart';
import { MainLayout } from '@/components/layout/MainLayout';
import { TokenInfo } from '@/components/TokenInfo';

const HomePage = () => {
  return (
    <MainLayout>
      <TokenInfo.Component />
      <div className="flex flex-col items-center justify-center gap-8 px-6 sm:py-12 lg:flex-row">
        <Chart.Component />
      </div>
    </MainLayout>
  );
};

export default HomePage;
