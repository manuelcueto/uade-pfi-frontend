import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import { Snackbar, IconButton, Typography } from '@material-ui/core';

export default function AlertSnack(props) {
    return <Snackbar
        open={props.open}
        autoHideDuration={6000}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        onClose={props.onClose} >
        <Alert variant='filled' severity={props.severity}>
            <Typography>{props.message}</Typography>
            <IconButton size="small" aria-label="close" color="inherit" onClick={props.onClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </Alert>
    </Snackbar>
}