import { toast } from 'react-toastify';

// export const toastError = (closeTimeout = 2000): ToastOptions => ({
//     hideProgressBar: true,
//     autoClose: closeTimeout,
//     position: 'bottom-left',
//     type: 'error',
// });

// export const toastSuccess = (closeTimeout = 2000): ToastOptions => ({
//     hideProgressBar: true,
//     autoClose: closeTimeout,
//     position: 'bottom-left',
//     type: 'success',
// });

// truyền message
export const toastSuccess = (message: string, closeTimeout = 2000) => {
    toast.success(message, {
        hideProgressBar: true,
        autoClose: closeTimeout,
        position: 'bottom-left',
        type: 'success',
    });
};

export const toastError = (message: string, closeTimeout = 2000) => {
    toast.success(message, {
        hideProgressBar: true,
        autoClose: closeTimeout,
        position: 'bottom-left',
        type: 'error',
    });
};
