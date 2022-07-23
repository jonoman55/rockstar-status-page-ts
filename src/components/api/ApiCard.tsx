import { useMemo } from 'react';
import { useTheme, Avatar, Typography, CardHeader, CardActions, IconButton, Stack, Divider } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';

import { RockstarSpinner } from '../design';
import { StatusIcon, CardActionBox } from '../shared';
import { Card, CardMedia } from '../styled/PaperCard.styled';
import { Container, CardContent, Title, Updated, DetailsLink } from '../styled/ApiCard.styled';
import { useGetApiStatusQuery } from '../../services/rockstarApi';
import { styleStatus } from '../../helpers';

import type { StatusType } from '../../types';

// TODO : Make the Avatar and Refresh Button into reusable components
// TODO : Fix typography styling (make font bolder)
export const ApiCard = () => {
    const theme = useTheme();

    const { data: apiStatus, isLoading, isFetching, refetch } = useGetApiStatusQuery('getApiStatus', {
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
        pollingInterval: 1000 * 60 * 5 // 5 min
    });

    const color = useMemo(() => {
        if (!isLoading) return styleStatus(theme, apiStatus.status.toLowerCase() as StatusType);
    }, [isLoading, apiStatus, theme]);

    return isLoading || isFetching ? <RockstarSpinner /> : (
        <Container>
            <Card elevation={2} sx={{ width: '100%', color: 'primary.contrastText' }}>
                <CardHeader
                    avatar={
                        <Avatar aria-label='status-icon' sx={{ bgcolor: 'inherit' }}>
                            <StatusIcon status={`${apiStatus.status.toLowerCase() as StatusType}`} />
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label='refresh' onClick={refetch} sx={{ color: 'primary.contrastText' }}>
                            <RefreshIcon fontSize='large' />
                        </IconButton>
                    }
                    title='Rockstar Services Status API'
                    subheader={`${new Date().toLocaleString()}`}
                />
                <CardMedia id={0} />
                <CardContent>
                    <DetailsLink href={`${process.env.REACT_APP_BACKEND_API_URL}`} target='_blank'>
                        <Title variant='h6'>{apiStatus.message}</Title>
                        <Divider sx={{ pb: 1 }} />
                        <Stack direction='row' sx={{ pt: 2 }}>
                            <Typography sx={{ pr: 1 }}>Status:</Typography>
                            <Typography variant='body1' sx={{ color: color, fontWeight: 'bold' }}>
                                {apiStatus.status}
                            </Typography>
                        </Stack>
                        <Divider sx={{ pt: 2 }} />
                        <Updated>{`Updated: ${apiStatus.updated}`}</Updated>
                    </DetailsLink>
                </CardContent>
                <CardActions sx={{ p: 0, display: 'flex' }}>
                    <CardActionBox />
                </CardActions>
            </Card>
        </Container>
    );
};
