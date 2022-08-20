import { useState } from 'react';
import { useTheme } from '@mui/material';
import {
    GridColDef,
    GridCellParams,
    GridColumnVisibilityModel,
    GridRowModel,
    GridRowClassNameParams,
    GridValidRowModel,
    GridRowHeightParams,
    GridRowHeightReturnValue
} from '@mui/x-data-grid';

import {
    DataGrid,
    backgroundStyles,
    dataGridComponents,
    getUpdatedDate,
    renderCellExpand,
    renderCellId,
    renderCellLink,
    renderCellStatusChip,
    renderColumnHeader,
} from '../styled/DataGrid.styled';

import type { OutageRow, OutagesDataGrid } from '../../types';

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

/**
 * Services DataGrid Props
 */
interface Props {
    /**
     * Outage Row Array
     */
    rows: OutageRow[],
    /**
     * Loading State
     */
    isLoading: boolean;
};

/**
 * Services DataGrid
 * @param props rows: OutageRow[], isLoading: boolean
 * @returns {JSX.Element} ServicesDataGrid
 */
export const ServicesDataGrid: React.FC<Props> = ({ rows, isLoading }): JSX.Element => {
    const theme = useTheme();

    const [pageSize, setPageSize] = useState<number>(10);
    const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>(initialColumnVisibilityState);

    const handleGetRowId = (row: GridRowModel) => {
        return row.id as number;
    };

    const handleGetRowHeight = (_params: GridRowHeightParams) => {
        return 'auto' as GridRowHeightReturnValue;
    };

    const handleGetRowClassName = (params: GridRowClassNameParams<GridValidRowModel>) => {
        return `super-app-theme--${params.row.status.toUpperCase()}` as string;
    };

    const handleEstimatedRowHeight = (_params: GridRowHeightParams) => {
        return 200 as number;
    };

    const handleOnPageSizeChange = (newPageSize: number) => {
        setPageSize(newPageSize);
    };

    const handleOnColumnVisibilityModelChange = (newModel: GridColumnVisibilityModel) => {
        setColumnVisibilityModel(newModel);
    };

    const handleOnCellClick = (params: GridCellParams) => {
        console.log(params.row);
    };

    const data: OutagesDataGrid = {
        columns: columns,
        rows: rows,
    };

    return (
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
            autoHeight
            hideFooterSelectedRowCount
            disableSelectionOnClick
            loading={isLoading}
            density='standard'
            rowSpacingType='border'
            getRowHeight={handleGetRowHeight}
            getEstimatedRowHeight={handleEstimatedRowHeight}
            getRowId={handleGetRowId}
            getRowClassName={handleGetRowClassName}
            pagination
            pageSize={pageSize}
            onPageSizeChange={handleOnPageSizeChange}
            rowsPerPageOptions={[5, 10, 25]}
            components={dataGridComponents}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={handleOnColumnVisibilityModelChange}
            onCellClick={handleOnCellClick}
            sx={backgroundStyles(theme)}
        />
    );
};
