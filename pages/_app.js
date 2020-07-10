import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import App from 'next/app';
import { createMuiTheme } from '@material-ui/core/styles';
import Head from 'next/head'
import { CssBaseline } from '@material-ui/core';
import lightGreen from '@material-ui/core/colors/lightGreen';
import amber from '@material-ui/core/colors/amber';

export default function MyApp(props) {

    const { Component, pageProps } = props
    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);
    let theme = createMuiTheme({
        palette: {
            type: 'dark',
            primary: lightGreen,
            secondary: amber
        },
    })

    return (

        < React.Fragment >
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Head>
                    <title>PFI - EmailMarketing</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <Component {...pageProps} />
            </ThemeProvider>
        </React.Fragment >)
}