import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import "../styles/globals.css";
import { NextPageWithLayout } from '../layout/NextPageWithLayout';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={pageProps.session}>
      {getLayout(
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
};

export default App;