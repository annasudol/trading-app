import React from 'react';

import { Book } from '@/components/Book';
import { Chart } from '@/components/Chart';
import { MainLayout } from '@/components/layout/MainLayout';
import { TokenInfo } from '@/components/TokenInfo';

const HomePage = () => {
  return (
    <MainLayout.Component>
      <div className="mt-2 flex w-full max-w-7xl flex-col justify-center gap-2 md:flex-row">
        <div className="grow">
          <TokenInfo.Component />
          <Chart.Component />
        </div>
        <Book.Component />
      </div>
    </MainLayout.Component>
  );
};

export default HomePage;
