import React from 'react';

import { Book } from '@/components/Book';
import { Chart } from '@/components/Chart';
import { MainLayout } from '@/components/layout/MainLayout';

const HomePage = () => {
  return (
    <MainLayout>
      <div className="mt-2 flex w-full max-w-7xl flex-col justify-center gap-2 md:flex-row">
        <div className="grow">
          <Chart.Component />
        </div>
        <Book.Component />
      </div>
    </MainLayout>
  );
};

export default HomePage;
