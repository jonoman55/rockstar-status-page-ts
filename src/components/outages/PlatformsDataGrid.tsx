import { useCallback } from 'react';
import { Theme } from '@mui/material';
import { GridRowClassNameParams, GridRowHeightParams, GridRowHeightReturnValue, GridRowModel,  GridValidRowModel } from '@mui/x-data-grid';
import { GridInitialStateCommunity } from '@mui/x-data-grid/models/gridStateCommunity';

import { DataGrid, backgroundStyles, dataGridComponents } from '../styled/DataGrid.styled';

import type { PlatformStatusesData } from '../../types';

/**
 * Initial DataGrid State
 */
const initialState: GridInitialStateCommunity = {
    columns: {
        columnVisibilityModel: {
            id: false,
            service: false,
            name: true,
            updated: true,
            status: true,
        },
    },
    sorting: {
        sortModel: [{
            field: 'status',
            sort: 'asc'
        }],
    },
};

/**
 * Services DataGrid Props
 */
interface Props {
    /**
     * Platform Statuses Data (columns and rows)
     */
    data: PlatformStatusesData,
    /**
     * Loading State
     */
    isLoading: boolean;
};

/**
 * Platforms DataGrid
 * @param {Props} props PlatformStatusesData, isLoading
 * @returns {JSX.Element} PlatformsDataGrid
 */
export const PlatformsDataGrid: React.FC<Props> = ({ data, isLoading }): JSX.Element => {
    const handleGetRowId = (row: GridRowModel) => {
        return row.name as string;
    };

    const handleGetRowClassName = (params: GridRowClassNameParams<GridValidRowModel>) => {
        return `super-app-theme--${params.row.status.toUpperCase()}` as string;
    };

    const handleGetRowHeight = useCallback((_params: GridRowHeightParams) => {
        return 'auto' as GridRowHeightReturnValue;
    }, []);

    const handleEstimatedRowHeight = useCallback((_params: GridRowHeightParams) => {
        return 200 as number;
    }, []);

    return (
        <DataGrid
            {...data}
            initialState={initialState}
            autoHeight
            hideFooter
            hideFooterSelectedRowCount
            disableSelectionOnClick
            loading={isLoading}
            density='standard'
            rowSpacingType='border'
            getRowHeight={handleGetRowHeight}
            getEstimatedRowHeight={handleEstimatedRowHeight}
            getRowId={handleGetRowId}
            getRowClassName={handleGetRowClassName}
            components={dataGridComponents(true)}
            sx={(theme: Theme) => ({ 
                minHeight: 400, 
                ...backgroundStyles(theme) 
            })}
        />
    );
};
