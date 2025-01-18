import '../styles/global.css';

import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { UIProvider } from '@/providers/UIProvider';
import { store } from '@/store';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <UIProvider>
      <Component {...pageProps} />
    </UIProvider>
  </Provider>
);

export default MyApp;
