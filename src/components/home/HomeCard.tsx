import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { Divider, Grid } from '@mui/material';
import { orderBy } from 'lodash';

import { StatusMenu } from '../shared';
import { RockstarSpinner } from '../design';
import { StatusGridItems, StatusIndicators, Title, Updated } from './HomeComponents';
import { Paper, Card, CardHeader, CardMedia, CardContent, CardFooter } from '../styled/PaperCard.styled';
import { useGetUpdatedQuery } from '../../services/rockstarApi';
import { useOverallStatus, useWindowSize } from '../../hooks';
import { convertToStatus } from '../../helpers';

import type { Status, StatusMenuItem } from '../../types';

export const HomeCard: React.FC<{}> = (): JSX.Element => {
    const size: number[] = useWindowSize();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open: boolean = Boolean(anchorEl);

    // Close Status Menu on Window Resize
    useEffect(() => {
        if (open) setAnchorEl(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [size]);

    const {
        data: updatedResult,
        isLoading: updatedIsLoading,
        refetch: updatedRefetch,
        isFetching: updatedIsFetching
    } = useGetUpdatedQuery('getUpdated', {
        refetchOnReconnect: true,
        pollingInterval: 1000 * 60 * 5 // 5 min
    });

    const {
        isLoading: statusesIsLoading,
        statuses: statusesResults,
        refetch: statusesRefetch,
        isFetching: statusesIsFetching,
        overallStatus,
    } = useOverallStatus('getAllStatuses', {
        refetchOnReconnect: true,
        pollingInterval: 1000 * 60 * 5 // 5 min
    });

    /**
     * Is Loading State
     */
    const isLoading: boolean = useMemo<boolean>(
        () => statusesIsLoading
            || updatedIsLoading
            || updatedIsFetching
            || statusesIsFetching,
        [
            statusesIsLoading,
            updatedIsLoading,
            updatedIsFetching,
            statusesIsFetching
        ]
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
                (status: Status) => results.push(status)
            );
        }
        return results;
    }, [statusesResults, statusesIsLoading]);

    /**
     * Create Menu Items
     */
    const menuItems: StatusMenuItem[] = useMemo<StatusMenuItem[]>(() => {
        const items: StatusMenuItem[] = [];
        if (!isLoading && statusesResults) {
            statusesResults.forEach((s: Status) =>
                items.push({
                    name: s.name,
                    status: convertToStatus(s.status),
                    to: `/service/${s.id}`,
                    id: s.id
                })
            );
        }
        return orderBy(items, ['status', 'desc']);
    }, [isLoading, statusesResults]);

    /**
     * Handle Refetch
     */
    const handleRefreshClick = useCallback(() => {
        statusesRefetch();
        updatedRefetch();
    }, [statusesRefetch, updatedRefetch]);

    /**
     * Handle Avatar Click and Open Status Menu
     */
    const handleAvatarClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    /**
     * Handle Menu Close
     */
    const handleClose = () => setAnchorEl(null);

    return isLoading ? <RockstarSpinner /> : (
        <Fragment>
            <Paper elevation={0}>
                <Card>
                    <CardHeader
                        title='Service Status'
                        subheader={`${new Date().toLocaleString()}`}
                        status={overallStatus}
                        onRefreshClick={handleRefreshClick}
                        onAvatarClick={handleAvatarClick}
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
            {open && (
                <StatusMenu
                    open={open}
                    anchorEl={anchorEl}
                    handleClose={handleClose}
                    menuItems={menuItems}
                />
            )}
        </Fragment>
    );
};
