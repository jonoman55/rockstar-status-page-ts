import { styled, Typography } from '@mui/material';

export const FlexText = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        fontSize: 14,
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: 14,
    },
    [theme.breakpoints.up('md')]: {
        fontSize: 16,
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: 18,
    },
}));

export const XSFlexText = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.down('xs')]: {
        fontSize: 14,
    },
    [theme.breakpoints.up('xs')]: {
        fontSize: 14,
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: 16,
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: 16,
    },
    [theme.breakpoints.up('md')]: {
        fontSize: 16,
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: 18,
    },
}));

export const XLFlexText = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.up('xs')]: {
        fontSize: 10,
    },
    [theme.breakpoints.down('xs')]: {
        fontSize: 12,
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: 12,
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: 14,
    },
    [theme.breakpoints.down('md')]: {
        fontSize: 16,
    },
    [theme.breakpoints.up('md')]: {
        fontSize: 18,
    },
    [theme.breakpoints.down('lg')]: {
        fontSize: 18,
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: 32,
    },
}));
