/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, useState } from 'react';
import { Typography } from '@mui/material';
import { GridColDef, GridCellParams, GridColumnVisibilityModel, GridRowModel, GridRenderCellParams, GridRowClassNameParams, GridValidRowModel } from '@mui/x-data-grid';

import {
    DataGrid,
    DataGridHeader,
    DataGridToolbar,
    DataGridWrapper,
    getBackgroundColor,
    getHoverBackgroundColor,
    getUpdatedDate,
    LinearProgress,
    NoRowsOverlay,
    renderCellExpand,
    renderCellId,
    renderCellLink,
    renderCellStatusChip,
    renderColumnHeader,
    SortedAscendingIcon,
    SortedDescendingIcon
} from '../styled/DataGrid.styled';
import { Card, CardContent, CardContentPaper, CardHeader, Paper } from '../styled/PaperCard.styled';
import { useGetServicesQuery, useGetStatusesQuery } from '../../services/rockstarApi';
import { useAppDispatch } from '../../app/hooks';
import { getStatusesCount } from '../../helpers';
import { RockstarStatus } from '../../constants';

import type { OutageRow, OutagesDataGrid, Status, StatusType } from '../../types';

/**
 * DataGrid Column Definitions
 */
const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 50,
        sortable: true,
        renderCell: renderCellId,
        renderHeader: renderColumnHeader,
    },
    {
        field: 'name',
        headerName: 'Name',
        width: 200,
        sortable: true,
        renderCell: renderCellLink,
        renderHeader: renderColumnHeader,
    },
    {
        field: 'updated',
        headerName: 'Updated',
        width: 200,
        sortable: true,
        type: 'string',
        valueGetter: getUpdatedDate,
        renderHeader: renderColumnHeader,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 100,
        sortable: true,
        renderCell: renderCellStatusChip,
        renderHeader: renderColumnHeader,
    },
    {
        field: 'message',
        headerName: 'Message',
        width: 400,
        flex: 1,
        sortable: true,
        renderCell: renderCellExpand,
        renderHeader: renderColumnHeader,
    }
];

/**
 * Initial Grid Column Visibility Model State
 */
const initialColumnVisibilityState: GridColumnVisibilityModel = {
    id: false,
    name: true,
    updated: true,
    status: true,
    message: true,
};

// TODO : Add Platform Statuses DataGrid
// DOCS : https://mui.com/x/react-data-grid/
const OutagesCard = () => {
    const dispatch = useAppDispatch();

    const [pageSize, setPageSize] = useState<number>(10);
    const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>(initialColumnVisibilityState);

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

    const handleRefresh = () => {
        servicesRefetch();
        statusesRefetch();
    };

    const handleGetRowId = (e: GridRowModel) => {
        return e.id as number;
    };

    const data: OutagesDataGrid = {
        columns: columns,
        rows: rows,
    };
    
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
                    onClick={handleRefresh}
                />
                <CardContentPaper>
                    <DataGridHeader />
                    <DataGridWrapper>
                        <DataGrid
                            {...data}
                            initialState={{
                                sorting: {
                                    sortModel: [{
                                        field: 'status',
                                        sort: 'desc'
                                    }],
                                },
                            }}
                            loading={isLoading}
                            autoHeight
                            hideFooterSelectedRowCount
                            disableSelectionOnClick
                            density='standard'
                            rowSpacingType='border'
                            getRowHeight={() => 'auto'}
                            getEstimatedRowHeight={() => 200}
                            getRowId={handleGetRowId}
                            getRowClassName={(params: GridRowClassNameParams<GridValidRowModel>) =>
                                `super-app-theme--${params.row.status.toUpperCase()}`
                            }
                            pageSize={pageSize}
                            onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
                            rowsPerPageOptions={[5, 10, 25]}
                            pagination
                            components={{
                                Toolbar: DataGridToolbar,
                                ColumnSortedDescendingIcon: SortedDescendingIcon,
                                ColumnSortedAscendingIcon: SortedAscendingIcon,
                                NoRowsOverlay: NoRowsOverlay,
                                LoadingOverlay: LinearProgress,
                            }}
                            columnVisibilityModel={columnVisibilityModel}
                            onColumnVisibilityModelChange={(newModel: GridColumnVisibilityModel) => {
                                setColumnVisibilityModel(newModel);
                            }}
                            onCellClick={(params: GridCellParams) => {
                                console.log(params.row);
                            }}
                            sx={{
                                '& .super-app-theme--UP': {
                                    bgcolor: (theme) =>
                                        getBackgroundColor(
                                            theme.custom.palette.green,
                                            theme.palette.mode
                                        ),
                                    '&:hover': {
                                        bgcolor: (theme) =>
                                            getHoverBackgroundColor(
                                                theme.custom.palette.green,
                                                theme.palette.mode,
                                            ),
                                    },
                                },
                                '& .super-app-theme--LIMITED': {
                                    bgcolor: (theme) =>
                                        getBackgroundColor(
                                            theme.custom.palette.yellow,
                                            theme.palette.mode
                                        ),
                                    '&:hover': {
                                        bgcolor: (theme) =>
                                            getHoverBackgroundColor(
                                                theme.custom.palette.yellow,
                                                theme.palette.mode,
                                            ),
                                    },
                                },
                                '& .super-app-theme--DOWN': {
                                    bgcolor: (theme) =>
                                        getBackgroundColor(
                                            theme.custom.palette.red,
                                            theme.palette.mode
                                        ),
                                    '&:hover': {
                                        bgcolor: (theme) =>
                                            getHoverBackgroundColor(
                                                theme.custom.palette.red,
                                                theme.palette.mode
                                            ),
                                    },
                                },
                            }}
                        />
                    </DataGridWrapper>
                </CardContentPaper>
            </Card>
        </Paper>
    );
};

export default OutagesCard;
