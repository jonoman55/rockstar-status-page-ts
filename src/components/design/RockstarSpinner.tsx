import { styled, useMediaQuery, Box, BoxProps } from '@mui/material';

import { Loading } from '../../images';

const Container = styled(Box)<BoxProps>(({ theme }) => ({
    height: useMediaQuery(theme.breakpoints.down('xs')) ? '100%' : '100vh', //'83.9vh', // '85.65vh',
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(0),
}));

const LoadingImage = styled('img')(({ theme }) => ({
    border: `1px solid ${theme.palette.action.disabled}`,
    borderRadius: '1rem',
}));

export const RockstarSpinner: React.FC<{}> = (): JSX.Element => (
    <Container>
        <LoadingImage src={Loading} alt='Loading...' />
    </Container>
);