import { Link } from '@nextui-org/react';

import { AppConfig } from '@/config/AppConfig';

const Footer = () => (
  <footer className="h-22 mx-auto max-w-screen-lg p-4 text-center">
    <div className="mx-auto flex-col items-center justify-center">
      <p className="py-1 ">
        Developed by{' '}
        <Link
          isExternal
          href={AppConfig.author_git}
          className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
        >
          {AppConfig.author}
        </Link>
        .
      </p>
      <Link
        isExternal
        showAnchorIcon
        href={AppConfig.url}
        className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
      >
        Visit source code on GitHub.
      </Link>
    </div>
  </footer>
);

export { Footer };
