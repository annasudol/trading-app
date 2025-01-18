import { Link, Navbar } from '@nextui-org/react';

import { AppConfig } from '@/config/AppConfig';

const MainNavbar = () => (
  <Navbar className="w-full" shouldHideOnScroll>
    <div className="mx-auto flex w-full flex-wrap items-center justify-between">
      <nav className="py-6">
        <Link href="/">{AppConfig.emoji}</Link>
      </nav>
    </div>
  </Navbar>
);

export { MainNavbar };
