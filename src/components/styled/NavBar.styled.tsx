import { NavLink, NavLinkProps } from 'react-router-dom';
import { styled, Box, AppBar as MuiAppBar, AppBarProps, ToggleButtonGroup as MuiToggleButtonGroup, ToggleButton as MuiToggleButton, ToggleButtonProps } from '@mui/material';

export const AppBar = styled(({ ...props }: AppBarProps) =>
    <MuiAppBar component='div' {...props} />
)(({
    backgroundColor: 'transparent',
}));

export const HomeButton = styled(({ ...props }: ToggleButtonProps) =>
    <MuiToggleButton {...props} />
)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(1),
    borderLeftStyle: 'none',
    '&.Mui-selected': {
        backgroundColor: 'inherit',
        color: theme.palette.primary.contrastText,
    },
    '&:hover': {
        color: theme.custom.palette.main,
    },
})) as unknown as typeof NavLink | typeof MuiToggleButton;

export const ToggleButton = styled(({ ...props }: ToggleButtonProps & NavLinkProps) =>
    <MuiToggleButton {...props} />, {
    shouldForwardProp: (prop: PropertyKey) => prop !== 'selected'
})(({ theme, selected }) => ({
    textAlign: 'center',
    padding: theme.spacing(1),
    ...(!selected && {
        color: theme.palette.primary.contrastText,
        '&:hover': {
            color: theme.custom.palette.main,
        },
    }),
    ...(selected && {
        '&:hover': {
            color: theme.palette.action.disabled,
        },
        '&.active': {
            color: theme.palette.mode === 'light'
                ? theme.palette.common.white
                : theme.custom.palette.main,
        }
    }),
})) as unknown as typeof NavLink | typeof MuiToggleButton;

export const ToggleButtonGroup = styled(MuiToggleButtonGroup)(({ theme }) => ({
    display: 'inline-flex',
    '& .MuiToggleButtonGroup-grouped': {
        borderRadius: 0,
        borderBottomStyle: 'none',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: 12,
    },
    [theme.breakpoints.up('md')]: {
        fontSize: 18,
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: 18,
    },
}));

export const ButtonContainer = styled(Box)(({ theme }) => ({
    width: 'auto',
    contain: 'content',
    backgroundColor: theme.palette.primary.dark,
    borderRadius: 0,
}));
