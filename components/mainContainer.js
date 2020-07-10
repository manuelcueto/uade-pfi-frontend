import Card from '@material-ui/core/Card';
import { AppBar } from '@material-ui/core';
import AlertSnack from '../components/alert';
import NavSidebar from '../components/sidebar';
import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress, Box } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    main: {
        margin: theme.spacing(3)
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    }
}));


export default function MainContainer({children, loading, alertVisible, onCloseAlert, alertSeverity, alertMessage}) {

    const classes = useStyles()
    return <div className={classes.root} >
        <AppBar position="fixed">
        </AppBar>
        <NavSidebar />
        <div className={classes.main}>
            <Box visibility={loading ? "visible" : "hidden"}>
                <LinearProgress />
            </Box>
            <Card className={classes.content} variant="outlined">
                {children}
            </Card>
            <AlertSnack open={alertVisible}
                onClose={onCloseAlert}
                severity={alertSeverity}
                message={alertMessage}
            />
        </div>
    </div>
}
