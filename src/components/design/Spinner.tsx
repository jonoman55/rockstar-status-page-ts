import { styled, Box, BoxProps, CircularProgress, CircularProgressProps } from '@mui/material';

const SpinnerBox = styled(Box)<BoxProps>(({ theme }) => ({
    height: '83.9vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.dark,
    margin: theme.spacing(0),
}));

const SpinnerProgress = styled(CircularProgress)<CircularProgressProps>(({ theme }) => ({
    color: theme.custom.palette.main,
}));

export const Spinner: React.FC<{}> = (): JSX.Element => (
    <SpinnerBox>
        <SpinnerProgress />
    </SpinnerBox>
); 
