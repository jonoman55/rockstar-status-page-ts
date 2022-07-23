import { styled, Box, AppBar as MuiAppBar, ToggleButtonGroup as MuiToggleButtonGroup, ToggleButton as MuiToggleButton, ToggleButtonProps } from '@mui/material';

export const AppBar = styled(MuiAppBar)(({
    backgroundColor: 'transparent',
}));

export const HomeButton = styled(MuiToggleButton)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(1),
    borderLeftStyle: 'none',
    '&.Mui-selected': {
        color: theme.custom.palette.main,
    },
    '&:hover': {
        color: theme.custom.palette.main,
    },
}));

export const ToggleButton = styled(({ ...props }: ToggleButtonProps) =>
    <MuiToggleButton {...props} />, {
    shouldForwardProp: (prop: PropertyKey) => prop !== 'selected'
})(({ theme, selected }) => ({
    textAlign: 'center',
    padding: theme.spacing(1),
    color: theme.palette.primary.contrastText,
    ...(!selected && {
        '&:hover': {
            color: theme.custom.palette.main,
        },
        '&.Mui-selected': {
            color: theme.custom.palette.main,
        },
    }),
    ...(selected && {
        color: theme.custom.palette.main,
        '&:hover': {
            color: theme.palette.action.selected,
        },
        '&.Mui-selected': {
            color: theme.custom.palette.main,
        },
    }),
}));

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