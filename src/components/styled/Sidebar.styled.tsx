import { styled, IconButton as MuiIconButton, Switch as MuiSwitch, ListSubheader as MuiListSubheader, ListSubheaderProps } from '@mui/material';

export const Switch = styled(MuiSwitch)(({ theme }) => ({
    '& .MuiSwitch-thumb': {
        color: theme.palette.mode === 'dark'
            ? theme.custom.palette.main
            : theme.palette.common.black,
    },
    '& .Mui-checked+.MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark'
            ? '#8796A5'
            : '#aab4be',
    },
})); 

export const ListSubheader = styled(MuiListSubheader)<ListSubheaderProps>(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: 16,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.mode === 'dark'
        ? theme.palette.background.paper
        : theme.palette.primary.dark,
}));

export const IconButton = styled(MuiIconButton)(({ theme }) => ({
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.contrastText,
    '&:hover': {
        color: theme.palette.secondary.contrastText
    },
}));
