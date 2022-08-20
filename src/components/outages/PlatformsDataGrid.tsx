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

const initialState: GridInitialStateCommunity = {
    columns: {
        columnVisibilityModel: {
            // Hide columns status and traderName, the other columns will remain visible
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
            sort: 'desc'
        }],
    },
};

/**
 * Services DataGrid Props
 */
interface Props {
    /**
     * Platform Statuses Data
     */
    data: PlatformStatusesData,
    /**
     * Loading State
     */
    isLoading: boolean;
};

/**
 * Services DataGrid
 * @param props PlatformStatusesData: columns and rows, isLoading: boolean
 * @returns {JSX.Element} ServicesDataGrid
 */
export const PlatformsDataGrid: React.FC<Props> = ({ data, isLoading }): JSX.Element => {
    const theme = useTheme();

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
