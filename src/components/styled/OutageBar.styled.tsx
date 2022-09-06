import {
    AppBar as MuiAppBar,
    AppBarProps as MuiAppBarProps,
    Button as MuiButton, 
    ButtonProps as MuiButtonProps, 
    Toolbar as MuiToolbar,
    ToolbarProps as MuiToolbarProps
} from '@mui/material';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import { Error, OfflineBolt, OfflinePin } from '@mui/icons-material';

import type { AlertColor } from '../../types';

/**
 * OutageBar AppBar
 */
export const AppBar = styled(({ ...props }: MuiAppBarProps) =>
    <MuiAppBar component='div' position='static' {...props} />
)(({ theme }) => ({
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1.5),
    backgroundColor: 'transparent',
    backgroundImage: 'none',
}));

/**
 * OutageBar Toolbar
 */
export const Toolbar = styled(MuiToolbar)<MuiToolbarProps>(({
    backgroundColor: 'transparent',
}));

/**
 * OutageBar Show Alert Button
 */
export const Button = styled(MuiButton)<MuiButtonProps>(({ theme }) => ({
    '&:hover': {
        backgroundColor: theme.custom.palette.main
    },
}));

/**
 * Create Alert Styles
 * @param {Theme} theme MUI Theme
 * @param {string} status Rockstar Service Status 
 * @returns {CSSObject} Alert CSS Styles
 */
export const alertStyles = (theme: Theme, status: string): CSSObject => {
    return {
        color: theme.palette.common.white,
        ...(status?.toLowerCase() === 'down' && {
            backgroundColor: theme.palette.mode === 'dark'
                ? theme.palette.error.dark
                : theme.palette.error.main,
        }),
        ...(status?.toLowerCase() === 'limited' && {
            backgroundColor: theme.palette.warning.main,
        }),
        ...(status?.toLowerCase() === 'up' && {
            backgroundColor: theme.palette.success.main,
        }),
        ...((!status || status === '') && {
            backgroundColor: theme.palette.info.main,
        }),
    };
};

/**
 * Create Link Styles
 * @param {Theme} theme MUI Theme
 * @returns {CSSObject} Link CSS Styles
 */
export const linkStyles = (theme: Theme): CSSObject => {
    return {
        textDecoration: 'none',
        color: theme.palette.common.white,
        '&:hover': {
            color: theme.palette.common.black,
        }
    };
};

/**
 * Outage Alert Icon
 * @param {string} status Rockstar Service Status 
 * @returns {JSX.Element} Icon
 */
export const alertIcon = (status: string): JSX.Element => {
    if (status?.toLowerCase() === 'down') return <Error fontSize='inherit' />;
    if (status?.toLowerCase() === 'limited') return <OfflineBolt fontSize='inherit' />;
    return <OfflinePin fontSize='inherit' />;
};

/**
 * Alert Severity Color
 * @param {string} status Rockstar Service Status
 * @returns {AlertColor} AlertColor
 */
export const severity = (status: string): AlertColor => {
    if (status?.toLowerCase() === 'down') return 'error';
    if (status?.toLowerCase() === 'limited') return 'warning';
    if (status?.toLowerCase() === 'up') return 'success';
    return 'info'
};
