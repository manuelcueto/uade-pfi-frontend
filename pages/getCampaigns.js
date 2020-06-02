import { useState } from 'react';
import { AppBar, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavSidebar from '../components/sidebar';
import GetCampaigns from '../components/getCampaigns';
import AlertSnack from '../components/alert';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    snackbar: {
        backgroundColor: theme.palette.background.default,
    }
}));

export default function Home() {

    const classes = useStyles()
    const [alertVisible, setAlertVisible] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [alertSeverity, setAlertSeverity] = useState('success')
    const showAlert = (severity, message) => {
        setAlertVisible(true)
        setAlertMessage(message)
        setAlertSeverity(severity)
    }

    return (
        <div className={classes.root} >
            <CssBaseline />
            <AppBar position="fixed">
            </AppBar>
            <NavSidebar />
            <main className={classes.content}>
                <GetCampaigns showAlert={showAlert} />
                <AlertSnack open={alertVisible}
                    onClose={() => setAlertVisible(false)}
                    severity={alertSeverity}
                    message={alertMessage}
                />
            </main>

        </div>
    )
}
