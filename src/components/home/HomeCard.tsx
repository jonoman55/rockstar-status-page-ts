import { useMemo } from 'react';
import { Divider, Grid } from '@mui/material';

import { RockstarSpinner } from '../design';
import { StatusGridItems, StatusIndicators, Title, Updated } from './HomeComponents';
import { Paper, Card, CardHeader, CardMedia, CardContent, CardFooter } from '../styled/PaperCard.styled';
import { useGetAllQuery, useGetStatusesQuery } from '../../services/rockstarApi';
import { RockstarStatus } from '../../constants';
import { getStatusesCount } from '../../helpers';

import type { Status, StatusType } from '../../types';

export const HomeCard = () => {
    const { data: allResults, isLoading: allIsLoading } = useGetAllQuery('getAll', {
        refetchOnReconnect: true,
        pollingInterval: 1000 * 60 * 5 // 5 min
    });

    const updated = useMemo(() => {
        if (!allIsLoading && allResults) return allResults?.updated;
    }, [allIsLoading, allResults]);

    const { data: results, isLoading, refetch } = useGetStatusesQuery('getAllStatuses', {
        refetchOnReconnect: true,
        pollingInterval: 1000 * 60 * 5 // 5 min
    });

    const statuses = useMemo<Status[] | undefined>(() => {
        if (!isLoading && results) {
            return results?.filter(
                (status: Status) =>
                    status?.name !== 'General' &&
                    status?.name !== 'Support'
            ) as Status[];
        }
    }, [results, isLoading]);

    const overallStatus = useMemo<StatusType | undefined>(() => { 
        if (!isLoading && statuses) {
            const highest = getStatusesCount(statuses.map(
                (s: Status) =>
                    s.status.toLowerCase() as RockstarStatus
            ));
            return highest?.toString().toLowerCase() as StatusType;
        }
    }, [statuses, isLoading]);

    return isLoading || allIsLoading ? <RockstarSpinner /> : (
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
                    <Updated updated={`${updated}`} />
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
