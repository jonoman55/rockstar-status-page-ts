import { useCallback } from "react";
import { useSnackbar, SnackbarMessage, SnackbarOrigin, SharedProps } from "notistack";

interface NotifyMessage extends SharedProps {
    message: SnackbarMessage;
};

const defaultAnchorOrigin: SnackbarOrigin = {
    horizontal: 'right',
    vertical: 'bottom'
};

export const useNotify = () => {
    const { enqueueSnackbar } = useSnackbar();

    const notify = useCallback(({
        message,
        variant,
        anchorOrigin = defaultAnchorOrigin,
        autoHideDuration = 3000,
        disableWindowBlurListener = false
    }: NotifyMessage) => {
        enqueueSnackbar(message, {
            variant,
            anchorOrigin,
            autoHideDuration,
            disableWindowBlurListener
        });
    }, [enqueueSnackbar]);

    return notify;
};