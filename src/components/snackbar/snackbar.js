import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { BorderBottom } from '@mui/icons-material';

export default function SnackbarCom() {
    const [open, setOpen] = React.useState(false);
    console.log(window.location.search.includes('redirect_status=succeeded'))
    //   http://localhost:3000/checkout/?payment_intent=pi_3LNsWOSIMProKj4q1XhLwsjH&payment_intent_client_secret=pi_3LNsWOSIMProKj4q1XhLwsjH_secret_I81IflOI73EO7ON7YL1Dqv9P0&redirect_status=succeeded

    const handleClick = () => {
        setOpen(true);
    };

    React.useEffect(() => {
        if (window.location.search.includes('redirect_status=succeeded')) {
            handleClick()
        }

    }, [])



    const handleClose = (event) => {
        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>
            <Button onClick={handleClick}>Open snackbar</Button>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Payment Successfull"
                action={action}
                anchorOrigin={{ 'vertical': 'bottom', 'horizontal': 'right'}}
            />
        </div>
    );
}
