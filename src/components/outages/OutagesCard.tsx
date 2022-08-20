import { useCallback, useMemo } from 'react';

import { ServicesDataGrid } from './ServicesDataGrid';
import { DataGridHeader, DataGridWrapper } from '../styled/DataGrid.styled';
import { Card, CardContentPaper, CardHeader, Paper } from '../styled/PaperCard.styled';
import { useGetServicesQuery, useGetStatusesQuery } from '../../services/rockstarApi';
import { getStatusesCount } from '../../helpers';
import { RockstarStatus } from '../../constants';

import type { OutageRow, Status, StatusType } from '../../types';

// TODO : Add Platform Statuses DataGrid
// DOCS : https://mui.com/x/react-data-grid/
export const OutagesCard = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data: servicesResults, isLoading: servicesIsLoading, refetch: servicesRefetch } = useGetServicesQuery('getServicesDG', {
        refetchOnReconnect: true,
        pollingInterval: 1000 * 60 * 5 // 5 min
    });

    const { data: statusesResults, isLoading: statusesIsLoading, refetch: statusesRefetch } = useGetStatusesQuery('getStatusesDG', {
        refetchOnReconnect: true,
        pollingInterval: 1000 * 60 * 5 // 5 min
    });

    const isLoading: boolean = useMemo<boolean>(
        () => servicesIsLoading || statusesIsLoading,
        [servicesIsLoading, statusesIsLoading]
    );

    const rows: OutageRow[] = useMemo<OutageRow[]>(() => {
        const results: OutageRow[] = [];
        if (!isLoading && statusesResults) {
            statusesResults?.forEach(
                (status: Status) => results.push(status)
            );
        }
        return results;
    }, [isLoading, statusesResults]);

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

    const handleRefetch = useCallback(() => {
        servicesRefetch();
        statusesRefetch();
    }, [servicesRefetch, statusesRefetch]);
    
    // console.log(rows);
    // console.log(servicesResults);
    // console.log(statusesResults);

    return (
        <Paper elevation={0}>
            <Card sx={{ my: 6, px: 4 }}>
                <CardHeader
                    title='Outages'
                    subheader={`${new Date().toLocaleString()}`}
                    status={overallStatus}
                    onClick={handleRefetch}
                />
                <CardContentPaper>
                    <DataGridHeader />
                    <DataGridWrapper>
                        <ServicesDataGrid
                            rows={rows}
                            isLoading={isLoading}
                        />
                    </DataGridWrapper>
                </CardContentPaper>
            </Card>
        </Paper>
    );
};
