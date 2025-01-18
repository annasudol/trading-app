import { NextSeo } from 'next-seo';
import type { PropsWithChildren } from 'react';
import React from 'react';

import { Footer } from '@/components/Footer';
import { MainHeader } from '@/components/header/MainHeader';
import { MainNavbar } from '@/components/MainNavbar';
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
