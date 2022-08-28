import { useCallback, useMemo } from 'react';
import { Divider, Grid } from '@mui/material';

import { RockstarSpinner } from '../design';
import { StatusGridItems, StatusIndicators, Title, Updated } from './HomeComponents';
import { Paper, Card, CardHeader, CardMedia, CardContent, CardFooter } from '../styled/PaperCard.styled';
import { useGetStatusesQuery, useGetUpdatedQuery } from '../../services/rockstarApi';
import { getHighestStatusCount } from '../../helpers';

import type { Platform, Status, StatusItem, StatusItems, StatusType } from '../../types';

export const HomeCard: React.FC = (): JSX.Element => {
    const { data: updatedResult, isLoading: updatedIsLoading, refetch: updatedRefetch } = useGetUpdatedQuery('getUpdated', {
        refetchOnReconnect: true,
        pollingInterval: 1000 * 60 * 5 // 5 min
    });

    const { data: statusesResults, isLoading: statusesIsLoading, refetch: statusesRefetch } = useGetStatusesQuery('getAllStatuses', {
        refetchOnReconnect: true,
        pollingInterval: 1000 * 60 * 5 // 5 min
    });

    /**
     * Is Loading State
     */
    const isLoading: boolean = useMemo<boolean>(
        () => statusesIsLoading || updatedIsLoading,
        [statusesIsLoading, updatedIsLoading]
    );

    /**
     * Get Statuses To Display
     */
    const statuses: Status[] = useMemo<Status[]>(() => {
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

    /**
     * Get Platforms
     */
    const platforms: Platform[] = useMemo<Platform[]>(() => {
        const results: Platform[] = [];
        if (!isLoading && statusesResults) {
            statusesResults?.forEach(
                (s: Status) => s.services_platforms.forEach(
                    (p: Platform) => results.push(p)
                )
            );
        }
        return results;
    }, [isLoading, statusesResults]);

    /**
     * Get Overall Status
     */
    const overallStatus: StatusType = useMemo<StatusType>(
        () => {
            // Initial State
            let statusItems: StatusItems = {
                statuses: []
            };
            // Add Service Status values to state
            if (!isLoading && statusesResults) {
                statusesResults.forEach((s: Status) =>
                    statusItems.statuses.push({
                        name: s.name,
                        status: s.status.toLowerCase(),
                        type: 'service'
                    })
                );
            }
            // Add Platform values to state
            if (!isLoading && platforms) {
                platforms.forEach((p) => {
                    statusItems.statuses.push({
                        name: p.name,
                        status: p.status.toLowerCase(),
                        type: 'platform'
                    });
                });
            }
            // Get All Statuses from state
            const allStatuses: StatusItem[] = Object.values(statusItems.statuses);
            // Get All Status Values
            const allStatusValues = allStatuses.map((v) => v.status.toLowerCase());
            // Get All Service Statuses from state
            const serviceValues: StatusItem[] = allStatuses.filter((s) => s.type === 'service');
            // Get Service and Status statuses
            const overallStatusValues: string[] = serviceValues.map((s) => s.status);
            // Check if Service and Status statuses are all UP
            const isOverallAllUp: boolean = overallStatusValues.every((v) => v === 'up');
            // Get Platform Statuses from state
            const platformValues: StatusItem[] = allStatuses.filter((s) => s.type === 'platform');
            // Get Platform statuses
            const platformStatusValues: string[] = platformValues.map((s) => s.status);
            // Check if Platform statuses are all UP
            const isPlatformsAllUp: boolean = platformStatusValues.every((v) => v === 'up');
            // All UP
            if (isOverallAllUp && isPlatformsAllUp) return 'up';
            // Service Status DOWN
            if (overallStatusValues.includes('down')) return 'down';
            // Service Status LIMITED
            if (overallStatusValues.includes('limited')) return 'limited';
            // Service Status AND Platforms DOWN
            if (overallStatusValues.includes('down') && platformStatusValues.includes('down')) return 'down';
            // Service Status AND Platforms LIMITED
            if (overallStatusValues.includes('limited') && platformStatusValues.includes('limited')) return 'limited';
            // Get highest status value count
            const highestValue = getHighestStatusCount(allStatusValues) as StatusType;
            // return highest status
            return highestValue;
        },
        [isLoading, statusesResults, platforms]
    );

    /**
     * Handle Refetch
     */
    const handleRefreshClick = useCallback<() => void>(() => {
        statusesRefetch();
        updatedRefetch();
    }, [statusesRefetch, updatedRefetch]);

    return isLoading ? <RockstarSpinner /> : (
        <Paper elevation={0}>
            <Card>
                <CardHeader
                    title='Service Status'
                    subheader={`${new Date().toLocaleString()}`}
                    status={overallStatus}
                    onRefreshClick={handleRefreshClick}
                />
                <CardMedia id={1} />
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
