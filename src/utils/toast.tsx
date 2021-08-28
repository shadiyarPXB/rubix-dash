import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { toast } from 'react-toastify';

const Toaster: (
    message: string | React.ReactNode,
    ToastProps?: string | React.ReactNode,
    type?: 'error',
    autoClose?: number,
) => React.ReactNode = (message, ToastProps, type, autoClose = 5000) => {
    if (type === 'error') {
        return toast(
            <Alert action={ToastProps} severity="error">
                {message}
            </Alert>,
            {
                autoClose,
            },
        );
    }

    return toast(<Alert action={ToastProps}>{message}</Alert>, {
        autoClose,
    });
};

export default Toaster;
