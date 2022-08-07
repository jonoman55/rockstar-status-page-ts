import { useMemo } from 'react';
import { useTheme, Divider, Typography, Stack } from '@mui/material';

import { RockstarSpinner } from '../design';
import { StatusChip } from '../shared';
import { Card, CardMedia, CardHeader, CardFooter } from '../styled/PaperCard.styled';
import { Container, CardContent, Title, Updated, DetailsLink } from '../styled/ApiCard.styled';
import { useGetApiStatusQuery } from '../../services/rockstarApi';

import type { StatusType } from '../../types';

export const ApiCard: React.FC = () => {
    const theme = useTheme();

    const { data: apiStatus, isLoading, refetch } = useGetApiStatusQuery('getApiStatus', {
        refetchOnReconnect: true,
        pollingInterval: 1000 * 60 * 5 // 5 min
    });

    const status = useMemo<StatusType>(() => {
        let result: StatusType;
        if (!isLoading && apiStatus) {
            result = apiStatus?.status?.toLowerCase() as StatusType;
        }
        return result;
    }, [isLoading, apiStatus]);

    return isLoading ? <RockstarSpinner /> : (
        <Container>
            <Card elevation={2}>
                <CardHeader
                    title='Rockstar Services Status API'
                    subheader={`${new Date().toLocaleString()}`}
                    status={status as StatusType}
                    onClick={refetch}
                />
                <CardMedia id={4} />
                <CardContent>
                    <DetailsLink href={`${process.env.REACT_APP_BACKEND_API_URL}`} target='_blank'>
                        <Title variant='h6'>{apiStatus?.message}</Title>
                        <Divider sx={{ pb: 1 }} />
                        <Stack direction='row' spacing={4} sx={{ pt: 2, alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant='h6' sx={{ pr: 1 }}>Status</Typography>
                            <StatusChip  status={`${apiStatus?.status}`} theme={theme} />
                        </Stack>
                        <Divider sx={{ pt: 2 }} />
                        <Updated variant='h6'>{`Updated: ${apiStatus?.updated}`}</Updated>
                    </DetailsLink>
                </CardContent>
                <CardFooter />
            </Card>
        </Container>
    );
};
