import { styled, Button, ButtonProps, Link } from '@mui/material';

export const FlexButton = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: 'inherit',
    '&:hover': {
        color: theme.palette.secondary.contrastText,
        backgroundColor: 'transparent',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: 12,
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: 12,
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: 16,
    },
}));

export const FlexLinkButton = styled(({ ...props }: ButtonProps) => (
    <Button {...props} LinkComponent={Link} />
))(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: 'inherit',
    '&:hover': {
        color: theme.palette.secondary.contrastText,
        backgroundColor: 'transparent',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: 12,
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: 12,
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: 16,
    },
}));