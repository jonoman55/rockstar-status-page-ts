import { GridColDef } from '@mui/x-data-grid';

import {
    getUpdatedDate,
    renderCellExpand,
    renderCellId,
    renderCellLink,
    renderCellStatusChip,
    renderCellText,
    renderColumnHeader
} from '../styled/DataGrid.styled';

/**
 * Services DataGrid Column Definitions
 */
export const serviceColumns: GridColDef[] = [
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
 * Platform Statuses DataGrid Column Definitions
 */
export const platformColumns = (screenSize: boolean): GridColDef[] => {
    return [
        {
            field: 'id',
            headerName: 'ID',
            width: 150,
            sortable: true,
            renderCell: renderCellId,
            renderHeader: renderColumnHeader,
        },
        {
            field: 'service',
            headerName: 'Service',
            width: 150,
            sortable: true,
            renderCell: renderCellText,
            renderHeader: renderColumnHeader,
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
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
            width: 125,
            flex: screenSize ? 1 : 0,
            sortable: true,
            renderCell: renderCellStatusChip,
            renderHeader: renderColumnHeader,
        }
    ];
};
