import { NextSeo } from 'next-seo';
import type { PropsWithChildren } from 'react';
import React from 'react';

import { Footer } from '@/components/ui/Footer';
import { MainHeader } from '@/components/ui/MainHeader';
import { MainNavbar } from '@/components/ui/MainNavbar';
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
        <main className="">
          <div className="mx-auto max-w-2xl grow">{props.children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
