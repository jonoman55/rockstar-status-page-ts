import { Box, Card as MuiCard, CardContent as MuiCardContent, Typography } from '@mui/material';
import { styled, darken, lighten } from '@mui/material/styles';

export const CardContent = styled(MuiCardContent)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: theme.spacing(4, 2, 0, 2),
    marginTop: theme.spacing(2)
}));

export const StatusCard = styled(MuiCard)(({ theme }) => ({
    minHeight: '325px',
    padding: theme.spacing(2),
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.mode === 'dark'
        ? theme.palette.primary.main
        : darken(
            theme.palette.primary.light,
            theme.palette.action.focusOpacity
        ),
    textDecoration: 'none',
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

export const Title = styled(Typography)(({ theme }) => ({
    color: theme.custom.palette.main,
    textDecoration: 'none',
    paddingTop: theme.spacing(1),
}));

export const StatusText = styled(Typography)(({ theme }) => ({
    paddingTop: theme.spacing(1),
    fontWeight: 'bold',
    textTransform: 'uppercase',
}));

export const UpdatedBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: theme.spacing(2.5),
}));
