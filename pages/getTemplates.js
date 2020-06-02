import { useState } from 'react';
import { AppBar, CssBaseline, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavSidebar from '../components/sidebar';
import GetTemplates from '../components/getTemplates';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    }
}));

export default function Home() {

    const classes = useStyles()
    const [alertVisible, setAlertVisible] = useState

    return (
        <div className={classes.root} >
            <CssBaseline />
            <AppBar position="fixed">
            </AppBar>
            <NavSidebar />
            <main className={classes.content}>
                <GetTemplates showAlert={setAlertVisible}/>
                <Snackbar
                    open={alertVisible}
                    autoHideDuration={6000}
                    message="Exito!"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    onClose={() => setAlertVisible(false)} />
            </main>

        </div>
    )
}
