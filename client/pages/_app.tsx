import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';

import { Layout } from '@components/layout';
import GlobalStyles from '@ui/core/GlobalStyles';

import store from '../lib/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>투두 리스트</title>
      </Head>
      <GlobalStyles />
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

export default MyApp;
