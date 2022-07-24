import { useMemo } from 'react';
import { useTheme, Divider, Typography, Stack } from '@mui/material';

import { RockstarSpinner } from '../design';
import { Card, CardMedia, CardHeader, CardFooter } from '../styled/PaperCard.styled';
import { Container, CardContent, Title, Updated, DetailsLink } from '../styled/ApiCard.styled';
import { useGetApiStatusQuery } from '../../services/rockstarApi';
import { styleStatus } from '../../helpers';

import type { StatusType } from '../../types';

export const ApiCard = () => {
    const theme = useTheme();

    const { data: apiStatus, isLoading, refetch } = useGetApiStatusQuery('getApiStatus', {
        refetchOnReconnect: true,
        pollingInterval: 1000 * 60 * 5 // 5 min
    });

    const status = useMemo<StatusType | undefined>(() => {
        if (!isLoading) return apiStatus.status.toLowerCase() as StatusType;
    }, [isLoading, apiStatus]);

    const color = useMemo<string | undefined>(() => {
        if (status) return styleStatus(theme, status);
    }, [status, theme]);

    return isLoading ? <RockstarSpinner /> : (
        <Container>
            <Card elevation={2}>
                <CardHeader
                    title='Rockstar Services Status API'
                    subheader={`${new Date().toLocaleString()}`}
                    status={status as StatusType}
                    onClick={refetch}
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
                <CardFooter />
            </Card>
        </Container>
    );
};
