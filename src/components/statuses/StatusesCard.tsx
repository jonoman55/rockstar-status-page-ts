import { useCallback, useMemo } from 'react';

import { RockstarSpinner } from '../design';
import { StatusesGridItems } from './StatusesComponents';
import { Paper, Card, CardHeader, CardMedia, CardFooter } from '../styled/PaperCard.styled';
import { CardContent } from '../styled/StatusesCard.styled';
import { useGetStatusesQuery } from '../../services/rockstarApi';
import { getHighestStatusCount } from '../../helpers';

import type { Status, StatusItem, StatusItems, StatusType } from '../../types';

export const StatusesCard: React.FC<{}> = (): JSX.Element => {
    const { data: statusesResults, isLoading: statusesIsLoading, refetch } = useGetStatusesQuery('getStatuses', {
        refetchOnReconnect: true,
        pollingInterval: 1000 * 60 * 5 // 5 min
    });

    /**
     * Get Statuses
     */
    const statuses: Status[] = useMemo<Status[]>(() => {
        const results: Status[] = [];
        if (!statusesIsLoading && statusesResults) {
            statusesResults.forEach((status: Status) => {
                results.push(status);
            });
        }
        return results;
    }, [statusesResults, statusesIsLoading]);

    /**
     * Get Overall Status
     */
     const overallStatus: StatusType = useMemo<StatusType>(
        () => {
            // Initial State
            let statusItems: StatusItems = {
                statuses: []
            };
            // Add Service Statuses to state
            if (!statusesIsLoading && statuses) {
                statuses.forEach(
                    (s) => statusItems.statuses.push({
                        name: s.name,
                        status: s.status.toLowerCase(),
                    })
                );
            }
            // Get All Statuses from state
            const statusesValues: StatusItem[] = Object.values(statusItems.statuses);
            // Get All Status Values
            const allStatusValues = statusesValues.map((v) => v.status.toLowerCase());
            // Check if Service and Status statuses are all UP
            const isOverallAllUp: boolean = allStatusValues.every((v) => v === 'up');
            // All UP
            if (isOverallAllUp) return 'up';
            // Service DOWN
            if (allStatusValues.includes('down')) return 'down';
            // Service LIMITED
            if (allStatusValues.includes('limited')) return 'limited';
            // Get highest status value count
            const highestValue = getHighestStatusCount(allStatusValues) as StatusType;
            // return highest status
            return highestValue;
        },
        [statuses, statusesIsLoading]
    );

    /**
     * Handle Refetch
     */
    const handleRefreshClick = useCallback<() => void>(() => {
        refetch();
    }, [refetch]);

    return statusesIsLoading ? <RockstarSpinner /> : (
        <Paper elevation={0}>
            <Card>
                <CardHeader
                    title='Rockstar Statuses'
                    subheader={`${new Date().toLocaleString()}`}
                    status={overallStatus as StatusType}
                    onRefreshClick={handleRefreshClick}
                    disabledAvatarClick={true}
                />
                <CardMedia id={10} />
                <CardContent>
                    {statuses && (
                        <StatusesGridItems
                            statuses={statuses}
                        />
                    )}
                </CardContent>
                <CardFooter />
            </Card>
        </Paper>
    );
};
