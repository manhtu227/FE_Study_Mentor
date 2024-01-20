import Layout from '@components/layout/Layout';
import { persistor, store } from '@core/store';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import '@styles/global.scss';
import { PersistGate } from 'redux-persist/integration/react';

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

