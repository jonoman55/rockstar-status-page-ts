import { useTheme } from '@mui/material';
import {
    GridCellParams,
    GridRowClassNameParams,
    GridRowHeightParams,
    GridRowHeightReturnValue,
    GridRowModel,
    GridValidRowModel
} from '@mui/x-data-grid';
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
 * @param props PlatformStatusesData, isLoading
 * @returns {JSX.Element} PlatformsDataGrid
 */
export const PlatformsDataGrid: React.FC<Props> = ({ data, isLoading }): JSX.Element => {
    const theme = useTheme();

    const handleGetRowId = (row: GridRowModel) => {
        return row.name as string;
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

    const handleOnCellClick = (params: GridCellParams) => {
        // console.log(params.row);
    };

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
            onCellClick={handleOnCellClick}
            sx={{ minHeight: 400, ...backgroundStyles(theme) }}
        />
    );
};
