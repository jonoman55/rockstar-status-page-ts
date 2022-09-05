import {
    styled,
    Badge as MuiBadge,
    BadgeProps as MuiBadgeProps,
    IconButton as MuiIconButton,
    Switch as MuiSwitch,
    ListSubheader as MuiListSubheader,
    ListSubheaderProps as MuiListSubheaderProps
} from '@mui/material';

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

export const ListSubheader = styled(MuiListSubheader)<MuiListSubheaderProps>(({ theme }) => ({
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

export const Badge = styled(MuiBadge)<MuiBadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: theme.custom.palette.brightRed,
    },
}));

export const OutagesBadge = styled(Badge)<MuiBadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      backgroundColor: theme.custom.palette.brightRed,
      padding: '0 4px',
    },
}));
