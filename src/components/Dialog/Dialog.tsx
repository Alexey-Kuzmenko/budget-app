import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface DialogWindowProps {
    isOpen: boolean
    title: string
    contentText: string
    onCloseHandler: React.MouseEventHandler
    onAcceptHandler: React.MouseEventHandler
}

function DialogWindow({ isOpen, title, contentText, onCloseHandler, onAcceptHandler }: DialogWindowProps) {

    return (
        <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={onCloseHandler}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {contentText}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCloseHandler}>Close</Button>
                <Button onClick={onAcceptHandler}>Accept</Button>
            </DialogActions>
        </Dialog>

    );
}

export default DialogWindow;