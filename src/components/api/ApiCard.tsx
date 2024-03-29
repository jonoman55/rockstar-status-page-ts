import { useCallback, useMemo } from 'react';
import { Divider, Typography } from '@mui/material';
import { Api as ApiIcon } from '@mui/icons-material';

import { StatusChip } from '../shared';
import { RockstarSpinner } from '../design';
import { Card, CardMedia, CardHeader, CardFooter } from '../styled/PaperCard.styled';
import { Container, CardContent, Title, Updated, DetailsLink, Stack, ApiChip } from '../styled/ApiCard.styled';
import { baseUrl, useGetApiStatusQuery } from '../../services/rockstarApi';
import { getApiName } from '../../utils';

import type { StatusType } from '../../types';

export const ApiCard: React.FC<{}> = (): JSX.Element => {
    const { data: apiStatus, isLoading, refetch, isFetching } = useGetApiStatusQuery('getApiStatus', {
        refetchOnReconnect: true,
        pollingInterval: 1000 * 60 * 5 // 5 min
    });

    const status: StatusType = useMemo<StatusType>(() => {
        let result: StatusType;
        if (!isLoading && apiStatus) {
            result = apiStatus?.status?.toLowerCase() as StatusType;
        }
        return result;
    }, [isLoading, apiStatus]);

    const handleRefreshClick = useCallback<() => void>(
        () => refetch(),
        [refetch]
    );

    const apiProvider: string = useMemo<string>(
        () => getApiName(baseUrl) as string,
        []
    );

    return isLoading || isFetching ? <RockstarSpinner /> : (
        <Container>
            <Card elevation={2}>
                <CardHeader
                    title='Rockstar Services Status API'
                    subheader={`${new Date().toLocaleString()}`}
                    status={status}
                    onRefreshClick={handleRefreshClick}
                    disabledAvatarClick={true}
                />
                <CardMedia id={4} />
                <CardContent>
                    <DetailsLink href={`${baseUrl}`} target='_blank'>
                        <Title variant='h6'>{apiStatus?.message}</Title>
                        <Divider sx={{ pb: 1 }} />
                        <Stack direction='row' spacing={4}>
                            <Typography variant='h6' sx={{ pr: 1 }}>Status</Typography>
                            <StatusChip status={`${apiStatus?.status}`} />
                        </Stack>
                        <Divider sx={{ pt: 2 }} />
                        <Updated variant='body1'>{`Updated: ${apiStatus?.updated}`}</Updated>
                        <Divider sx={{ pt: 1 }} />
                        <Stack direction='row'>
                            <Typography variant='body1'>API Provider</Typography>
                            <ApiChip
                                label={apiProvider}
                                icon={<ApiIcon />}
                            />
                        </Stack>
                    </DetailsLink>
                </CardContent>
                <CardFooter />
            </Card>
        </Container>
    );
};
