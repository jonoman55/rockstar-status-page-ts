import { Paper as MuiPaper, Card as MuiCard, CardContent as MuiCardContent, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Paper = styled(MuiPaper)(({ theme }) => ({
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent', //theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(4),
    borderRadius: 0,
    boxShadow: 'none',
    [theme.breakpoints.up('xs')]: {
        padding: theme.spacing(0),
    },
}));

export const Card = styled(MuiCard)(({ theme }) => ({
    padding: theme.spacing(2),
    margin: theme.spacing(4),
    alignContent: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    '& .MuiCardHeader-title': {
        color: theme.palette.primary.contrastText,
        paddingRight: theme.spacing(2),
    },
    '& .MuiCardHeader-subheader': {
        color: theme.palette.primary.contrastText,
        paddingRight: theme.spacing(2),
    },
}));

export const ImageBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center'
}));

export const Image = styled('img')(({ theme }) => ({
    objectFit: 'scale-down',
    backgroundColor: theme.palette.common.white,
    height: '250px',
    width: '345px',
    border: `solid 1px ${theme.palette.common.black}`,
    borderRadius: '0.5rem',
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        maxWidth: '294px',
    },
}));

export const CardContent = styled(MuiCardContent)(({ theme }) => ({
    padding: theme.spacing(0, 2),
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
}));

export const StatusTextBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
    paddingTop: theme.spacing(1.5)
}));
