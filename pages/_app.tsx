import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { persistor, store } from '@core/store';
import { PersistGate } from 'redux-persist/integration/react';
import Head from 'next/head';
import Layout from '@components/layout/Layout';
import '@styles/global.scss';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Study Mentor</title>
            </Head>
            <Layout>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <Component {...pageProps} />
                    </PersistGate>
                </Provider>
            </Layout>
        </>
    );
}

