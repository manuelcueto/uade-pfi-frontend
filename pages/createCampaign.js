import { AppBar, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavSidebar from '../components/sidebar';
import NewCampaign from '../components/newCampaign';

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


    return (
        <div className={classes.root} >
            <CssBaseline />
            <AppBar position="fixed">
            </AppBar>
            <NavSidebar />
            <main className={classes.content}>
                <NewCampaign />
            </main>

        </div>
    )
}
