import { Link, Navbar } from '@nextui-org/react';

import { AppConfig } from '@/config/AppConfig';

const MainNavbar = () => {
  return (
    <Navbar className="w-full" shouldHideOnScroll>
      <div className="max-w-5xl px-2">
        <nav className="py-6">
          <Link href="/">
            {AppConfig.emoji}
            <h1 className="ml-4 text-xl font-bold">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                {AppConfig.title}
              </span>
            </h1>
          </Link>
        </nav>
      </div>
    </Navbar>
  );
};

export { MainNavbar };
