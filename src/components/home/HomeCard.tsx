/* eslint-disable @typescript-eslint/no-unused-vars */
import { NavLink } from 'react-router-dom';
import { useTheme, Box, Stack, Link, Typography, Divider, Grid, Card as MuiCard } from '@mui/material';
import { styled, alpha, darken, lighten } from '@mui/material/styles';
import { Wifi as WifiIcon } from '@mui/icons-material';
import { sortBy } from 'lodash';

import { RockstarSpinner } from '../design';
import { PlatformIcon } from '../shared';
import { FlexText } from '../controls';
import { Paper, Card, CardHeader, CardMedia, CardContent, CardFooter } from '../styled/PaperCard.styled';
import { RockstarStatus } from '../../constants';
import { styleStatus } from '../../helpers';

import type { Status, StatusType } from '../../types';
import { useGetAllQuery } from '../../services/rockstarApi';

// TODO : Move to new HomeCard.styled.tsx file
const RockstarLinkStack = styled(Stack)(({ theme }) => ({
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}));

const RockstarLink = styled(Link)(({ theme }) => ({
    mb: '0.35em',
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',
    '&:hover': {
        color: theme.custom.palette.main,
    },
}));

const RockstarLinkIcon = styled(WifiIcon)(({ theme }) => ({
    color: theme.custom.palette.brightGreen,
}));

const Title = () => (
    <RockstarLinkStack direction='row' spacing={2}>
        <RockstarLinkIcon />
        <RockstarLink href={process.env.REACT_APP_ROCKSTAR_SERVICE_URL} target='_blank' variant='h5'>
            Service Status
        </RockstarLink>
    </RockstarLinkStack>
);

const Updated = ({ updated }: { updated: string }) => (
    <FlexText gutterBottom sx={{ textTransform: 'uppercase', textAlign: 'center', pb: 2 }}>
        Updated&nbsp;{`${updated}`}
    </FlexText>
);

const StatusCard = styled(MuiCard)(({ theme }) => ({
    minHeight: '625px',
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

// TODO : Finish implementing this component
// TODO : Add Status Indicator Grid
export const HomeCard = () => {
    const theme = useTheme();
    const statusType = RockstarStatus.UP;

    const { data: results, isLoading, refetch } = useGetAllQuery('getAll', {
        // refetchOnReconnect: true,
        // pollingInterval: 1000 * 60 * 5 // 5 min
    });

    console.log(results);

    const platforms = (status: Status) => sortBy(status?.services_platforms, 'name')?.map((platform, idx) => (
        <Box key={idx} sx={{
            p: 1, display: 'flex', flexWrap: 'nowrap', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'
        }}>
            <Box sx={{ display: 'flex', flexWrap: 'nowrap', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', flexWrap: 'nowrap', flexDirection: 'row' }}>
                    <PlatformIcon platform={platform?.name} />
                    <Typography sx={{ pl: 2 }}>{platform?.name}</Typography>
                </Box>
                <Typography sx={{ color: `${styleStatus(theme, statusType)}`, fontWeight: 'bold' }}>
                    {platform?.status}
                </Typography>
            </Box>
        </Box>
    ));

    return isLoading ? <RockstarSpinner /> : (
        <Paper elevation={0}>
            <Card>
                <CardHeader
                    title='Service Status'
                    subheader={`${new Date().toLocaleString()}`}
                    status={statusType}
                    onClick={refetch}
                />
                <CardMedia id={0} />
                <CardContent>
                    <Title />
                    <Updated updated={`${new Date().toLocaleString()}`} />
                    <Divider variant='middle' sx={{ pt: 1 }} />
                    <Grid container spacing={{ xs: 2, md: 3 }} sx={{ p: 2 }}>
                        {results.statuses.filter((status: Status) => status?.name !== 'General' && status?.name !== 'Support').map((status: Status, index: number) => (
                            <Grid item key={index} component={NavLink} to={`/service/${status?.id}`} xs={12} sm={12} md={6} lg={4} xl={3} sx={{ textDecoration: 'none' }}>
                                <StatusCard>
                                    <Box sx={{ p: 1, border: `solid 1px ${theme.palette.common.black}`, borderRadius: '0.5rem', bgcolor: 'common.white' }}>
                                        <CardMedia id={status?.id} />
                                    </Box>
                                    <Typography variant='h6' gutterBottom paragraph sx={{ pt: 2, textAlign: 'center', color: theme.custom.palette.main }}>
                                        {status?.name}
                                    </Typography>
                                    <Divider variant='middle' />
                                    <Stack direction='column' spacing={1} sx={{ pt: 2 }}>
                                        {status?.services_platforms && platforms(status)}
                                    </Stack>
                                </StatusCard>
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
                <CardFooter />
            </Card>
        </Paper>
    );
};
