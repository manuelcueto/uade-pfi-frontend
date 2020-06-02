import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText, ButtonGroup } from '@material-ui/core';

export default function ConfirmDialog(props) {


    return <Dialog open={props.onOpen} onClose={props.onClose}>
        <DialogTitle>{props.titleText}</DialogTitle>
        <DialogContent>
            <DialogContentText>{props.contentText}</DialogContentText>
            {props.children}
        </DialogContent>
        <DialogActions>
            <ButtonGroup>
                <Button onClick={props.onCancel} color="primary">
                    Cancelar
            </Button>
                <Button onClick={props.onConfirm} variant='contained' color="primary" autoFocus>
                    {props.confirmText}
                </Button>
            </ButtonGroup>
        </DialogActions>
    </Dialog>
}