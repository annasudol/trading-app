import { Link, Navbar } from '@nextui-org/react';

import { AppConfig } from '@/config/AppConfig';

export const MainNavbarComponent = () => {
  return (
    <Navbar className="w-full" shouldHideOnScroll>
      <div className="mx-auto flex h-11 w-full flex-wrap items-center justify-start">
        <nav className="py-6">
          <Link href="/">{AppConfig.emoji}</Link>
        </nav>
        <h1 className="ml-2 font-semibold text-zinc-200">{AppConfig.name}</h1>
      </div>
    </Navbar>
  );
};
