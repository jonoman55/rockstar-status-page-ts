import { useState } from 'react';
import { useTheme } from '@mui/material';
import {
    GridCellParams,
    GridColumnVisibilityModel,
    GridRowModel,
    GridRowClassNameParams,
    GridValidRowModel,
    GridRowHeightParams,
    GridRowHeightReturnValue
} from '@mui/x-data-grid';
import { GridInitialStateCommunity } from '@mui/x-data-grid/models/gridStateCommunity';

import { serviceColumns } from './columnDefs';
import { DataGrid, backgroundStyles, dataGridComponents } from '../styled/DataGrid.styled';

import type { ServiceRow, ServicesData } from '../../types';

/**
 * Initial DataGrid State
 */
const initialState: GridInitialStateCommunity = {
    sorting: {
        sortModel: [{
            field: 'status',
            sort: 'desc'
        }],
    },
};

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
     * Service Rows
     */
    rows: ServiceRow[],
    /**
     * Loading State
     */
    isLoading: boolean;
};

/**
 * Services DataGrid
 * @param props rows, isLoading
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
        // console.log(params.row);
    };

    const data: ServicesData = {
        columns: serviceColumns,
        rows: rows,
    };

    return (
        <DataGrid
            {...data}
            initialState={initialState}
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
            components={dataGridComponents()}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={handleOnColumnVisibilityModelChange}
            onCellClick={handleOnCellClick}
            sx={backgroundStyles(theme)}
        />
    );
};
