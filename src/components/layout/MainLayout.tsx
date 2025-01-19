import { NextSeo } from 'next-seo';
import type { PropsWithChildren } from 'react';
import React from 'react';

import { Footer } from '@/components/layout/Footer';
import { MainHeader } from '@/components/layout/MainHeader';
import { MainNavbar } from '@/components/layout/MainNavbar';
import { AppConfig } from '@/config/AppConfig';

export function MainLayout(props: PropsWithChildren) {
  return (
    <div>
      <NextSeo
        title={AppConfig.name}
        description={AppConfig.description}
        canonical={AppConfig.url}
      />
      <div className="flex min-h-screen flex-col justify-between">
        <MainNavbar />
        <MainHeader />
        <main>
          <div className="mx-auto max-w-5xl grow px-2">{props.children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
