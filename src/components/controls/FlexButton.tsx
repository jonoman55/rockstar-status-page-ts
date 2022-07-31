import { styled, Button as MuiButton, ButtonProps } from '@mui/material';

export const FlexButton = styled(MuiButton)<ButtonProps>(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'nowrap',
    [theme.breakpoints.up('xs')]: {
        flexDirection: 'column',
        fontSize: 12,
    },
    [theme.breakpoints.up('lg')]: {
        flexDirection: 'row',
        fontSize: 16,
    },
    '&:hover': {
        color: theme.palette.secondary.contrastText,
        backgroundColor: 'transparent',
    },
}));
