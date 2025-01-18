import React from 'react';

import { MainLayout } from '@/components/layout/MainLayout';

const HomePage = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center gap-8 px-6 sm:py-12 md:flex-row">
        <p>app</p>
      </div>
    </MainLayout>
  );
};

export default HomePage;
