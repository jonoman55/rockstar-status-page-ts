/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Box, LinearProgress as MuiLinearProgress, linearProgressClasses, Pagination } from '@mui/material';
import {
    DataGrid,
    GridColDef,
    GridValueGetterParams,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
    GridCellParams,
    gridClasses
} from '@mui/x-data-grid';
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
    FiberManualRecord as FiberManualRecordIcon
} from '@mui/icons-material';
import { styled, alpha, darken, lighten } from '@mui/material/styles';

import { Card, CardContent, CardHeader, CardMedia, Paper } from '../styled/PaperCard.styled';

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
        backgroundColor: theme.palette.grey[200],
        '&:hover, &.Mui-hovered': {
            backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
            '@media (hover: none)': {
                backgroundColor: 'transparent',
            },
        },
        '&.Mui-selected': {
            backgroundColor: alpha(
                theme.palette.primary.main,
                ODD_OPACITY + theme.palette.action.selectedOpacity,
            ),
            '&:hover, &.Mui-hovered': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    ODD_OPACITY +
                    theme.palette.action.selectedOpacity +
                    theme.palette.action.hoverOpacity,
                ),
                // Reset on touch devices, it doesn't add specificity
                '@media (hover: none)': {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        ODD_OPACITY + theme.palette.action.selectedOpacity,
                    ),
                },
            },
        },
    },
}));

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    border: 0,
    color: theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    '& .MuiDataGrid-columnsContainer': {
        backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
    },
    '& .MuiDataGrid-iconSeparator': {
        display: 'none',
    },
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
        borderRight: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
            }`,
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
        borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
            }`,
    },
    '& .MuiDataGrid-cell': {
        color:
            theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
    },
    '& .MuiPaginationItem-root': {
        borderRadius: 0,
    },
}));

function SortedDescendingIcon() {
    return <ExpandMoreIcon className="icon" />;
};

function SortedAscendingIcon() {
    return <ExpandLessIcon className="icon" />;
};

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
        </GridToolbarContainer>
    );
};

export function CustomFooterStatusComponent(props: {
    status: 'connected' | 'disconnected';
}) {
    return (
        <Box sx={{ p: 1, display: 'flex' }}>
            <FiberManualRecordIcon
                fontSize="small"
                sx={{
                    mr: 1,
                    color: props.status === 'connected' ? '#4caf50' : '#d9182e',
                }}
            />
            Status {props.status}
        </Box>
    );
};

// function CustomPagination() {
//     const apiRef = useGridApiContext();
//     const page = useGridSelector(apiRef, gridPageSelector);
//     const pageCount = useGridSelector(apiRef, gridPageCountSelector);

//     return (
//       <Pagination
//         color="primary"
//         count={pageCount}
//         page={page + 1}
//         onChange={(event, value) => apiRef.current.setPage(value - 1)}
//       />
//     );
// };

const StyledGridOverlay = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& .ant-empty-img-1': {
        fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
    },
    '& .ant-empty-img-2': {
        fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
    },
    '& .ant-empty-img-3': {
        fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
    },
    '& .ant-empty-img-4': {
        fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
    },
    '& .ant-empty-img-5': {
        fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
        fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
    },
}));

function CustomNoRowsOverlay() {
    return (
        <StyledGridOverlay>
            <svg
                width="120"
                height="100"
                viewBox="0 0 184 152"
                aria-hidden
                focusable="false"
            >
                <g fill="none" fillRule="evenodd">
                    <g transform="translate(24 31.67)">
                        <ellipse
                            className="ant-empty-img-5"
                            cx="67.797"
                            cy="106.89"
                            rx="67.797"
                            ry="12.668"
                        />
                        <path
                            className="ant-empty-img-1"
                            d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                        />
                        <path
                            className="ant-empty-img-2"
                            d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                        />
                        <path
                            className="ant-empty-img-3"
                            d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                        />
                    </g>
                    <path
                        className="ant-empty-img-3"
                        d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
                    />
                    <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
                        <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
                        <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
                    </g>
                </g>
            </svg>
            <Box sx={{ mt: 1 }}>No Rows</Box>
        </StyledGridOverlay>
    );
};

const LinearProgress = styled(MuiLinearProgress)(({ theme }) => ({
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        backgroundColor: theme.custom.palette.main,
    },
}));

const getBackgroundColor = (color: string, mode: string) =>
    mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const getHoverBackgroundColor = (color: string, mode: string) =>
    mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

function getFullName(params: GridValueGetterParams) {
    return `${params.row.firstName || ''} ${params.row.lastName || ''}`;
};

const columns: GridColDef[] = [
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
        field: 'fullName',
        headerName: 'Full name',
        width: 160,
        valueGetter: getFullName,
    },
    { field: 'status', headerName: 'Status', width: 100 }
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', status: 'UP' },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', status: 'UP' },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', status: 'LIMITED' },
    { id: 4, lastName: 'Stark', firstName: 'Arya', status: 'UP' },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', status: 'DOWN' },
];

// TODO : Finish implement this component
// DOCS : https://mui.com/x/react-data-grid/
const OutagesCard = () => {
    // const [status, setStatus] = useState<string>('connected');
    const [pageSize, setPageSize] = useState<number>(5);

    const isLoading = false;

    const data = {
        columns: columns,
        rows: rows,
    };

    return (
        <Paper elevation={0}>
            <Card>
                <CardHeader
                    title='Outages'
                    subheader={`${new Date().toLocaleString()}`}
                    status={'up'}
                    onClick={() => { }}
                />
                <CardMedia id={0} />
                <CardContent>
                    <Box sx={{
                        height: 400,
                        width: '100%',
                        '& .super-app-theme--UP': {
                            bgcolor: (theme) =>
                                getBackgroundColor(theme.palette.success.main, theme.palette.mode),
                            '&:hover': {
                                bgcolor: (theme) =>
                                    getHoverBackgroundColor(
                                        theme.palette.success.main,
                                        theme.palette.mode,
                                    ),
                            },
                        },
                        '& .super-app-theme--LIMITED': {
                            bgcolor: (theme) =>
                                getBackgroundColor(theme.palette.warning.main, theme.palette.mode),
                            '&:hover': {
                                bgcolor: (theme) =>
                                    getHoverBackgroundColor(
                                        theme.palette.warning.main,
                                        theme.palette.mode,
                                    ),
                            },
                        },
                        '& .super-app-theme--DOWN': {
                            bgcolor: (theme) =>
                                getBackgroundColor(theme.palette.error.main, theme.palette.mode),
                            '&:hover': {
                                bgcolor: (theme) =>
                                    getHoverBackgroundColor(theme.palette.error.main, theme.palette.mode),
                            },
                        },
                    }}>
                        <Box sx={{ display: 'flex', height: '100%' }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <DataGrid
                                    {...data}
                                    sortModel={[{
                                        field: 'status',
                                        sort: 'desc'
                                    }]}
                                    getRowClassName={(params) => `super-app-theme--${params.row.status}`}
                                    loading={isLoading}
                                    pageSize={pageSize}
                                    onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
                                    rowsPerPageOptions={[5, 10, 25]}
                                    pagination
                                    components={{
                                        // Toolbar: CustomToolbar,
                                        ColumnSortedDescendingIcon: SortedDescendingIcon,
                                        ColumnSortedAscendingIcon: SortedAscendingIcon,
                                        NoRowsOverlay: CustomNoRowsOverlay,
                                        LoadingOverlay: LinearProgress,
                                        // Footer: CustomFooterStatusComponent,
                                    }}
                                    // componentsProps={{
                                    //     footer: { status },
                                    // }}
                                    onCellClick={(params: GridCellParams) => {
                                        console.log(params.row);
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Paper>
    );
};

export default OutagesCard;
