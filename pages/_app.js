import { ThemeProvider } from '@material-ui/styles';
import App from 'next/app';
import { createMuiTheme } from '@material-ui/core/styles';
import Head from 'next/head'
import { CssBaseline } from '@material-ui/core';
import lightGreen from '@material-ui/core/colors/lightGreen';
import amber from '@material-ui/core/colors/amber';

class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props
        let theme = createMuiTheme({
            palette: {
                type: 'dark',
                primary: lightGreen,
                secondary: amber
            },
        })
        return (
            <React.Fragment>
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
}

export default MyApp;