import { styled, Box, Button as MuiButton, Typography as MuiTypography, Paper as MuiPaper, Card as MuiCard, CardContent as MuiCardContent, CardActions as MuiCardActions, BoxProps } from '@mui/material';
import { SentimentDissatisfied } from '@mui/icons-material';

export const Paper = styled(MuiPaper)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    minHeight: '83.9vh',
    boxShadow: theme.shadows[2],
}));

export const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    backgroundColor: theme.palette.primary.dark,
    minWidth: '250px',
    boxShadow: theme.shadows[2],
}));

export const CardContent = styled(MuiCardContent)(({
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap'
}));

export const Typography = styled(MuiTypography)(({ theme }) => ({
    textAlign: 'center',
    color: theme.palette.primary.contrastText,
    fontWeight: 'bold',
}));

export const ImageBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: theme.spacing(4),
}));

export const Image = styled(({ ...props }: BoxProps) =>
    <Box component={SentimentDissatisfied} {...props} />
)(({ theme }) => ({
    color: theme.custom.palette.main,
    backgroundColor: theme.palette.common.white,
    height: 64,
    width: 64,
    borderRadius: '3rem',
    boxShadow: theme.shadows[1],
}));

export const CardActions = styled(MuiCardActions)(({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}));

export const Button = styled(MuiButton)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.black,
    '&:hover': {
        backgroundColor: theme.custom.palette.main,
    },
}));
