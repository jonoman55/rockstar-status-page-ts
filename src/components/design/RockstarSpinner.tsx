import { styled, useMediaQuery, Box } from '@mui/material';

import { Loading } from '../../images';

const Container = styled(Box)(({ theme }) => ({
    height: useMediaQuery(theme.breakpoints.down('xs')) ? '100%' : '80vh', //'83.9vh', // '85.65vh',
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(0),
}));

const LoadingImage = styled('img')(({ theme }) => ({
    border: `1px solid ${theme.palette.action.disabled}`,
    borderRadius: '1rem',
    // borderColor:  theme.palette.action.disabled,
}));

export const RockstarSpinner: React.FC = () => (
    <Container>
        <LoadingImage src={Loading} alt='Loading...' />
    </Container>
);