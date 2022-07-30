import { useMemo } from 'react';
import { Divider, Grid } from '@mui/material';

import { RockstarSpinner } from '../design';
import { StatusGridItems, StatusIndicators, Title, Updated } from './HomeComponents';
import { Paper, Card, CardHeader, CardMedia, CardContent, CardFooter } from '../styled/PaperCard.styled';
import { useGetStatusesQuery, useGetUpdatedQuery } from '../../services/rockstarApi';
import { RockstarStatus } from '../../constants';
import { getStatusesCount } from '../../helpers';

import type { Status, StatusType } from '../../types';

export const HomeCard: React.FC = () => {
    const { data: updatedResult, isLoading: updatedIsLoading } = useGetUpdatedQuery('getUpdated', {
        refetchOnReconnect: true,
        pollingInterval: 1000 * 60 * 5 // 5 min
    });

    const { data: statusesResults, isLoading: statusesIsLoading, refetch } = useGetStatusesQuery('getAllStatuses', {
        refetchOnReconnect: true,
        pollingInterval: 1000 * 60 * 5 // 5 min
    });

    const statuses = useMemo<Status[]>(() => {
        const results: Status[] = [];
        if (!statusesIsLoading && statusesResults) {
            statusesResults?.filter(
                (status: Status) =>
                    status?.name !== 'General' &&
                    status?.name !== 'Support'
            ).forEach(
                (status: Status) =>
                    results.push(status)
            );
        }
        return results;
    }, [statusesResults, statusesIsLoading]);

    const overallStatus = useMemo<StatusType>(() => {
        let result: StatusType;
        if (!statusesIsLoading && statuses) {
            const highest = getStatusesCount(
                statuses.map((s: Status) => {
                    return s.status?.toLowerCase() as RockstarStatus;
                })
            );
            result = highest?.toString().toLowerCase() as StatusType;
        }
        return result;
    }, [statuses, statusesIsLoading]);

    return statusesIsLoading || updatedIsLoading ? <RockstarSpinner /> : (
        <Paper elevation={0}>
            <Card>
                <CardHeader
                    title='Service Status'
                    subheader={`${new Date().toLocaleString()}`}
                    status={overallStatus as StatusType}
                    onClick={refetch}
                />
                <CardMedia id={0} />
                <CardContent>
                    <Title />
                    <Updated updated={`${updatedResult?.updated}`} />
                    <Divider variant='middle' sx={{ pt: 1 }} />
                    <Grid container spacing={{ xs: 2, md: 3 }} sx={{ p: 2 }}>
                        {statuses && (
                            <StatusGridItems statuses={statuses} />
                        )}
                    </Grid>
                    <StatusIndicators />
                </CardContent>
                <CardFooter />
            </Card>
        </Paper>
    );
};
