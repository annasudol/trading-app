import React from 'react';

import { Book } from '@/components/Book';
import { Chart } from '@/components/Chart';
import { MainLayout } from '@/components/layout/MainLayout';
import { TokenInfo } from '@/components/TokenInfo';

const HomePage = () => {
  return (
    <MainLayout>
      <TokenInfo.Component />
      <div className="mt-2 flex w-full flex-1 flex-col gap-2 sm:flex-row">
        <Chart.Component />
        <Book.Component />
      </div>
    </MainLayout>
  );
};

export default HomePage;
