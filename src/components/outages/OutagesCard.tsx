import { useCallback, useMemo } from 'react';
import { Grid } from '@mui/material';
import { groupBy } from 'lodash';

import { ServicesDataGrid } from './ServicesDataGrid';
import { PlatformsDataGrid } from './PlatformsDataGrid';
import { platformColumns as columns } from './columnDefs';
import { DataGridHeader, DataGridWrapper } from '../styled/DataGrid.styled';
import { Card, CardContentPaper, CardHeader, Paper } from '../styled/PaperCard.styled';
import { useGetServicesQuery, useGetStatusesQuery } from '../../services/rockstarApi';
import { getStatusesCount } from '../../helpers';
import { RockstarStatus } from '../../constants';

import type {
    Platform,
    PlatformStatusesData,
    PlatformStatusRow,
    Service,
    ServiceRow,
    Status,
    StatusType
} from '../../types';

export const OutagesCard = () => {
    /**
     * RTK Fetch Services Query
     */
    const {
        data: servicesResults,
        isLoading: servicesIsLoading,
        refetch: servicesRefetch
    } = useGetServicesQuery('getServicesDG', {
        refetchOnReconnect: true,
        pollingInterval: 1000 * 60 * 5 // 5 min
    });

    /**
     * RTK Fetch Statuses Query
     */
    const {
        data: statusesResults,
        isLoading: statusesIsLoading,
        refetch: statusesRefetch
    } = useGetStatusesQuery('getStatusesDG', {
        refetchOnReconnect: true,
        pollingInterval: 1000 * 60 * 5 // 5 min
    });

    /**
     * RTK DataGrid Loading State
     */
    const isLoading: boolean = useMemo<boolean>(
        () => servicesIsLoading || statusesIsLoading,
        [servicesIsLoading, statusesIsLoading]
    );

    /**
     * Services DataGrid Rows
     */
    const servicesRows: ServiceRow[] = useMemo<ServiceRow[]>(() => {
        const results: ServiceRow[] = [];
        if (!isLoading && servicesResults) {
            servicesResults?.forEach(
                (service: Service) => results.push(service)
            );
        }
        return results;
    }, [isLoading, servicesResults]);

    /**
     * Platform Status DataGrid Rows
     */
    const platformStatusRows: PlatformStatusRow[] = useMemo<PlatformStatusRow[]>(() => {
        const results: PlatformStatusRow[] = [];
        if (!isLoading && statusesResults) {
            statusesResults?.forEach(({ name, updated, services_platforms }: Status) => {
                services_platforms.forEach((p: Platform, index: number) => {
                    return results.push({
                        id: index,
                        service: name,
                        updated: updated,
                        name: p.name,
                        status: p.status
                    });     
                });
            });
        }
        return results;
    }, [isLoading, statusesResults]);

    /**
     * Platform Statuses DataGrid Data (columns and rows)
     */
    const platformsStatusData: PlatformStatusesData[] = useMemo(() => {
        const results: PlatformStatusesData[] = [];
        if (platformStatusRows) {
            const groupedRows = groupBy(platformStatusRows, 'service');
            Object.values(groupedRows).forEach((rows: PlatformStatusRow[]) => {
                results.push({
                    columns,
                    rows
                });
            });
        }
        return results;
    }, [platformStatusRows]);

    /**
     * Overall Status
     */
    const overallStatus: StatusType = useMemo<StatusType>(() => {
        let result: StatusType;
        if (!isLoading && statusesResults) {
            const highest = getStatusesCount(
                statusesResults.map((s: Status) => {
                    return s.status?.toLowerCase() as RockstarStatus;
                })
            );
            result = highest?.toString().toLowerCase() as StatusType;
        }
        return result;
    }, [statusesResults, isLoading]);

    /**
     * Handle Refresh/Refetch
     */
    const handleRefetch = useCallback(() => {
        servicesRefetch();
        statusesRefetch();
    }, [servicesRefetch, statusesRefetch]);

    return (
        <Paper elevation={0}>
            <Card>
                <CardHeader
                    title='Services & Statuses'
                    subheader={`${new Date().toLocaleString()}`}
                    status={overallStatus}
                    onClick={handleRefetch}
                />
                <CardContentPaper>
                    <DataGridHeader />
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <DataGridWrapper>
                                <ServicesDataGrid
                                    rows={servicesRows}
                                    isLoading={isLoading}
                                />
                            </DataGridWrapper>
                        </Grid>
                        {platformsStatusData.map((data: PlatformStatusesData, index: number) => (
                            <Grid key={index} item xs={12} sm={12} md={6} lg={6} xl={6}>
                                <DataGridWrapper>
                                    <PlatformsDataGrid
                                        data={data}
                                        isLoading={isLoading}
                                    />
                                </DataGridWrapper>
                            </Grid>
                        ))}
                    </Grid>
                </CardContentPaper>
            </Card>
        </Paper>
    );
};
