import { styled, Box, CircularProgress } from "@mui/material";

const Spinner = styled(CircularProgress)(({ theme }) => ({
    backgroundColor: 'inherit',
    color: theme.custom.palette.main,
}));

const SpinnerContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: '100%',
}));

export const OutagesSpinner: React.FC = (): JSX.Element => (
    <SpinnerContainer>
        <Spinner />
    </SpinnerContainer>
);
