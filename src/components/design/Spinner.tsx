import { styled, Box, CircularProgress } from '@mui/material';

const SpinnerBox = styled(Box)(({ theme }) => ({
    height: '83.9vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.dark,
    margin: theme.spacing(0),
}));

const SpinnerProgress = styled(CircularProgress)(({ theme }) => ({
    color: theme.custom.palette.main,
}));

export const Spinner = (): JSX.Element => (
    <SpinnerBox>
        <SpinnerProgress />
    </SpinnerBox>
); 
