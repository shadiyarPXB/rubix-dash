import React, { useEffect } from 'react';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import type { AppProps /*, AppContext */ } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from 'constants/theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/globals.css';

function getLibrary(provider: any): Web3Provider {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
}
const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);
    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
                <link rel="stylesheet" href="https://use.typekit.net/zrp8rvq.css" />
            </Head>
            <ThemeProvider theme={theme}>
                <Web3ReactProvider getLibrary={getLibrary}>
                    <CssBaseline />
                    <Component {...pageProps} />{' '}
                    <ToastContainer
                        position="bottom-right"
                        autoClose={4000}
                        hideProgressBar={true}
                        newestOnTop={false}
                        toastClassName="toast"
                        closeButton={false}
                    />
                </Web3ReactProvider>
            </ThemeProvider>
        </>
    );
};

export default MyApp;
