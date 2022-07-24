import { Box, CardContent as MuiCardContent, Typography, Link, LinkProps } from '@mui/material';
import { styled, lighten, darken } from '@mui/material/styles';

export const Container = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(10.92),
    },
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(8, 2, 8, 2),
    },
}));

export const Title = styled(Typography)(({ theme }) => ({
    padding: theme.spacing(0.5, 0),
    color: theme.custom.palette.main,
    [theme.breakpoints.up('xs')]: {
        fontSize: 18,
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: 20,
    },
}));

export const Updated = styled(Typography)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: theme.spacing(2, 0, 1, 0),
}));

export const DetailsLink = styled(({ ...props }: LinkProps) =>
    <Link {...props} />
)(({ theme }) => ({
    padding: theme.spacing(2),
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.mode === 'dark'
        ? theme.palette.primary.main
        : darken(
            theme.palette.primary.light,
            theme.palette.action.focusOpacity
        ),
    textDecoration: 'none',
    minHeight: '125px',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    '&:hover': {
        color: theme.palette.primary.contrastText,
        backgroundColor: lighten(
            theme.palette.primary.dark,
            theme.palette.action.hoverOpacity
        ),
    },
}));

export const CardContent = styled(MuiCardContent)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    padding: theme.spacing(4, 2, 2, 2),
    marginTop: theme.spacing(2),
    fontWeight: 'bold',
}));
