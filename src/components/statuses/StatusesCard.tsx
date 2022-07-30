import { useMemo } from 'react';
import { useTheme } from '@mui/material';

import { RockstarSpinner } from '../design';
import { StatusesGridItems } from './StatusesComponents';
import { Paper, Card, CardHeader, CardMedia, CardFooter } from '../styled/PaperCard.styled';
import { CardContent } from '../styled/StatusesCard.styled';
import { useGetStatusesQuery } from '../../services/rockstarApi';
import { RockstarStatus } from '../../constants';
import { getStatusesCount } from '../../helpers';

import type { Status, StatusType } from '../../types';

export const StatusesCard: React.FC = () => {
    const theme = useTheme();

    const { data: statusesResults, isLoading: statusesIsLoading, refetch } = useGetStatusesQuery('getStatuses', {
        refetchOnReconnect: true,
        pollingInterval: 1000 * 60 * 5 // 5 min
    });

    const statuses = useMemo<Status[]>(() => {
        const results: Status[] = [];
        if (!statusesIsLoading && statusesResults) {
            statusesResults.forEach((status: Status) => {
                results.push(status);
            });
        }
        return results;
    }, [statusesResults, statusesIsLoading]);

    const overallStatus = useMemo<StatusType>(() => {
        let result: StatusType;
        if (!statusesIsLoading && statuses) {
            const highest = getStatusesCount(
                statuses.map((s: Status) => {
                    return s?.status?.toLowerCase() as RockstarStatus;
                })
            );
            result = highest?.toString().toLowerCase() as StatusType;
        }
        return result;
    }, [statuses, statusesIsLoading]);

    return statusesIsLoading ? <RockstarSpinner /> : (
        <Paper elevation={0}>
            <Card>
                <CardHeader
                    title='Rockstar Statuses'
                    subheader={`${new Date().toLocaleString()}`}
                    status={overallStatus as StatusType}
                    onClick={refetch}
                />
                <CardMedia id={0} />
                <CardContent>
                    {statuses && (
                        <StatusesGridItems
                            statuses={statuses}
                            theme={theme}
                        />
                    )}
                </CardContent>
                <CardFooter />
            </Card>
        </Paper>
    );
};
