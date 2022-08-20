import type { AppProps } from 'next/app';
import Head from 'next/head';

import { Layout } from '@components/layout';

import GlobalStyles from '@ui/core/GlobalStyles';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>투두 리스트</title>
      </Head>
      <GlobalStyles />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
