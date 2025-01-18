import '../styles/global.css';

import type { AppProps } from 'next/app';

import { UIProvider } from '@/providers/UIProvider';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <UIProvider>
    <Component {...pageProps} />
  </UIProvider>
);

export default MyApp;
