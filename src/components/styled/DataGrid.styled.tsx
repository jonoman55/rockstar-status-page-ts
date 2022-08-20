// DOCS : https://mui.com/x/react-data-grid/
import { Fragment, memo, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Chip, Divider, IconButton, Pagination, Popper, Typography } from '@mui/material';
import {
    CardHeader as MuiCardHeader,
    CardHeaderProps,
    CardContent as MuiCardContent,
    CardContentProps,
    LinearProgress as MuiLinearProgress,
    linearProgressClasses,
    Link as MuiLink,
    Paper as MuiPaper,
} from '@mui/material';
import {
    DataGrid as MuiDataGrid,
    GridValueGetterParams,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
    gridClasses,
    GridColumnHeaderParams,
    GridRenderCellParams
} from '@mui/x-data-grid';
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
    FiberManualRecord as FiberManualRecordIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';
import { styled, alpha, darken, lighten, useTheme, Theme } from '@mui/material/styles';

import { ToolTip } from '../controls';
import { StatusChip, StatusChipProps } from '../shared';
import { CardMediaBrandLogo, RefreshButton, StatusAvatar } from './PaperCard.styled';
import { appActions } from '../../reducers/appSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RockstarSupport } from '../../images';

import type { Children, ServiceRow, Status, StatusType } from '../../types';

/* <---------- Start Of Not In Use Components ----------> */
/**
 * Styled Ant Design DataGrid
 */
export const AntDesignDataGrid = styled(MuiDataGrid)(({ theme }) => ({
    border: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
    color:
        theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
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
            theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
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
        '& .MuiDataGrid-colCell, .MuiDataGrid-cell': {
            borderRight:
                `1px solid ${theme.palette.mode === 'light'
                    ? '#f0f0f0'
                    : '#303030'
                }`,
        },
        '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
            borderBottom:
                `1px solid ${theme.palette.mode === 'light'
                    ? '#f0f0f0'
                    : '#303030'
                }`,
        },
        '& .MuiDataGrid-cell': {
            color: theme.palette.mode === 'light'
                ? 'rgba(0,0,0,.85)'
                : 'rgba(255,255,255,0.65)',
        },
        '& .MuiPaginationItem-root': {
            borderRadius: 0,
        },
        '& .MuiCheckbox-root svg': {
            width: 16,
            height: 16,
            backgroundColor: 'transparent',
            border:
                `1px solid ${theme.palette.mode === 'light'
                    ? '#d9d9d9'
                    : 'rgb(67, 67, 67)'
                }`,
            borderRadius: 2,
        },
        '& .MuiCheckbox-root svg path': {
            display: 'none',
        },
        '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
            backgroundColor: '#1890ff',
            borderColor: '#1890ff',
        },
        '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
            position: 'absolute',
            display: 'table',
            border: '2px solid #fff',
            borderTop: 0,
            borderLeft: 0,
            transform: 'rotate(45deg) translate(-50%,-50%)',
            opacity: 1,
            transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
            content: '""',
            top: '50%',
            left: '39%',
            width: 5.71428571,
            height: 9.14285714,
        },
        '& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after': {
            width: 8,
            height: 8,
            backgroundColor: '#1890ff',
            transform: 'none',
            top: '39%',
            border: 0,
        },
    },
}));

/**
 * Odd Opacity for Striped DataGrid
 */
const ODD_OPACITY = 0.2;

/**
 * Styled Striped DataGrid
 */
export const StripedDataGrid = styled(MuiDataGrid)(({ theme }) => ({
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

/**
 * Styled Card Header
 */
export const CardHeader = styled(({ ...props }: CardHeaderProps) =>
    <MuiCardHeader {...props} component={MuiPaper} elevation={0} />
)(({ theme }) => ({
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: theme.palette.mode === 'dark'
        ? 'inherit'
        : theme.palette.divider,
    border: `1px solid ${theme.palette.divider}`,
}));

/**
 * Styled Card Header Props Interface
 */
interface StyledCardHeaderProps {
    title: string;
    subheader: string;
    status: StatusType;
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

/**
 * Styled Card Header
 */
export const StyledCardHeader: React.FC<StyledCardHeaderProps> = ({ title, subheader, status, onClick }): JSX.Element => (
    <CardHeader
        avatar={<StatusAvatar status={status} />}
        action={<RefreshButton onClick={onClick} />}
        title={title}
        subheader={subheader}
        sx={{ textAlign: 'right' }}
    />
);

/**
 * Styled Card Content
 */
export const CardContent = styled(({ ...props }: CardContentProps) =>
    <MuiCardContent {...props} component={MuiPaper} elevation={0} />
)(({ theme }) => ({
    height: '100%',
    width: '100%',
    flexGrow: 1,
    padding: theme.spacing(0),
    '&:last-child': {
        paddingBottom: theme.spacing(0),
    },
}));

export const CardImageBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1),
    border: `solid 1px ${theme.palette.common.black}`,
    borderRadius: '0.5rem',
    backgroundColor: theme.palette.common.white,
}));

/**
 * DataGrid Card Image
 * @returns {JSX.Element} Rockstar Support Image
 */
export const DataGridCardImage = (): JSX.Element => (
    <CardImageBox>
        <CardMediaBrandLogo id={5} />
    </CardImageBox>
);

/**
 * DataGrid Status
 */
type DataGridStatus = 'connected' | 'disconnected';

/**
 * DataGird Footer Status
 * @param {DataGridStatus} props  connected or disconnected
 * @returns {JSX.Element} DataGridFooterStatus Component
 */
export const DataGridFooterStatus = (props: {
    status: DataGridStatus;
}): JSX.Element => (
    <Box sx={{ p: 1, display: 'flex' }}>
        <FiberManualRecordIcon
            fontSize="small"
            sx={{
                mr: 1,
                color: props.status === 'connected'
                    ? '#4caf50'
                    : '#d9182e',
            }}
        />
        Status {props.status}
    </Box>
);

/**
 * DataGrid Pagination
 * @param {number} props pageCount
 * @default pageCount 10
 * @returns {JSX.Element} DataGridPagination Component
 */
export const DataGridPagination = (props: {
    pageCount: 10
}): JSX.Element => {
    const [page, setPage] = useState<number>(1);
    return (
        <Pagination
            color="primary"
            count={props.pageCount}
            page={page + 1}
            onChange={(_event, value: number) => setPage(value - 1)}
        />
    );
};

/**
 * Memoized Grid Cell StatusChip Component
 */
export const GridCellStatusTypeChip = memo(({ status }: StatusChipProps) => {
    const theme = useTheme();
    return (
        <StatusChip
            status={status}
            theme={theme}
        />
    );
});

/**
 * Get Full Name
 * @description Concatenates First and Last Name
 * @param {GridValueGetterParams} params Grid Value Getter Params
 * @returns {string} Fullname
 */
export const getFullName = (params: GridValueGetterParams): string => {
    return `${params.row.firstName || ''} ${params.row.lastName || ''}`;
};

/**
 * Expandable Cell
 * @param {GridRenderCellParams} params Grid Render Cell Params
 * @returns {JSX.Element} Expandable Cell Component
 */
export const ExpandableCell = ({ value }: GridRenderCellParams): JSX.Element => {
    const [expanded, setExpanded] = useState(false);
    return (
        <Box>
            {expanded ? value : value.slice(0, 200)}&nbsp;
            {value.length > 200 && (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <MuiLink
                    type="button"
                    component="button"
                    sx={{ color: (theme) => theme.palette.info.main, fontSize: 'inherit' }}
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? 'view less' : 'view more'}
                </MuiLink>
            )}
        </Box>
    );
};

/**
 * Render Expandable Cell
 * @param {GridRenderCellParams} params Grid Render Cell Params
 * @returns {JSX.Element} Rendered Expandable Cell Component
 */
export function renderExpandableCell(params: GridRenderCellParams): JSX.Element {
    return (
        <ExpandableCell {...params} />
    );
};
/* <---------- End Of Not In Use Components ----------> */

/* <---------- Start Of In Use Components ----------> */
/**
 * Styled DataGrid
 */
export const DataGrid = styled(MuiDataGrid)(({ theme }) => ({
    borderRadius: 0,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    color: theme.palette.mode === 'light'
        ? 'rgba(0, 0, 0, .85)'
        : 'rgba(255, 255, 255, 0.85)',
    fontFamily: [
        '-apple-system',
        'Neue Haas Grotesk Light',
        'sans-serif'
    ].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    '&. MuiDataGrid-virtualScrollerContent': {
        borderRight: `1px solid ${theme.palette.mode === 'light'
            ? 'rgba(224, 224, 224, 1)'
            : 'rgba(81, 81, 81, 1)'}`,
        borderLeft: `1px solid ${theme.palette.mode === 'light'
            ? 'rgba(224, 224, 224, 1)'
            : 'rgba(81, 81, 81, 1)'}`,
    },
    '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': {
        padding: theme.spacing(1, 0),
    },
    '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': {
        paddingTop: '15px',
        paddingBottom: '15px',
    },
    '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': {
        paddingTop: '22px',
        paddingBottom: '22px',
    },
    '& .MuiDataGrid-toolbarContainer': {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: theme.spacing(0.5),
        borderBottom: theme.palette.mode === 'light'
            ? '1px solid rgba(224, 224, 224, 1)'
            : '1px solid rgba(81, 81, 81, 1)',
        '& .MuiButtonBase-root.MuiButton-root': {
            color: theme.palette.primary.contrastText,
        },
    },
    '& .MuiDataGrid-columnsContainer': {
        backgroundColor: theme.palette.mode === 'light'
            ? '#fafafa'
            : '#1d1d1d',
    },
    '& .MuiDataGrid-iconSeparator': {
        display: 'none',
        color: 'transparent',
    },
    '& .MuiIconButton-root': {
        marginLeft: '4px',
        marginRight: '4px',
    },
    '& .MuiDataGrid-virtualScroller': {
        minHeight: '200px',
    },
    '& .MuiDataGrid-row--lastVisible': {
        borderBottom: theme.palette.mode === 'light'
            ? '1px solid rgba(224, 224, 224, 1)'
            : '1px solid rgba(81, 81, 81, 1)'
    },
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
        borderRight: `1px solid ${theme.palette.mode === 'light'
            ? 'rgba(224, 224, 224, 1)'
            : 'rgba(81, 81, 81, 1)'}`,
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
        borderBottom: `1px solid ${theme.palette.mode === 'light'
            ? 'rgba(224, 224, 224, 1)'
            : 'rgba(81, 81, 81, 1)'}`,
    },
    '& .MuiDataGrid-cell': {
        color: theme.palette.mode === 'light'
            ? 'rgba(0, 0, 0, .85)'
            : 'rgba(255, 255, 255, 0.65)',
    },
    '& .MuiPaginationItem-root': {
        borderRadius: 0,
    },
    '&:nth-of-type(odd), &:nth-of-type(even)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

/**
 * DataGrid Wrapper
 * @description Wraps DataGrid Component
 * @param {Children} props React Node and JSX Elements
 * @returns {JSX.Element} Data Grid Wrapper Component
 */
export const DataGridWrapper = (props: {
    children: Children
}): JSX.Element => (
    <Box sx={{ height: '100%', width: '100%' }}>
        <Box sx={{ display: 'flex', height: '100%' }}>
            <Box sx={{ flexGrow: 1 }}>
                {props.children}
            </Box>
        </Box>
    </Box>
);

/**
 * Styled DataGrid Header Box
 */
export const DataGridHeaderBox = styled(MuiPaper)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: theme.spacing(2),
    color: theme.palette.common.white,
    textAlign: 'center',
    backgroundColor: theme.palette.mode === 'light'
        ? 'rgba(0, 0, 0, 0.04)'
        : 'rgba(255, 255, 255, 0.08)',
    boxShadow: 'none',
    backgroundImage: 'none',
    borderRadius: 0,
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderRight: theme.palette.mode === 'light'
        ? '1px solid rgba(224, 224, 224, 1)'
        : '1px solid rgba(81, 81, 81, 1)',
    borderLeft: theme.palette.mode === 'light'
        ? '1px solid rgba(224, 224, 224, 1)'
        : '1px solid rgba(81, 81, 81, 1)',
    borderTop: theme.palette.mode === 'light'
        ? '1px solid rgba(224, 224, 224, 1)'
        : '1px solid rgba(81, 81, 81, 1)',
    borderBottom: `2px solid ${theme.custom.palette.main}`,
}));

/**
 * Styled DataGrid Header Image Box
 */
export const StyledImageBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: 'transparent',
    borderRadius: theme.shape.borderRadius
}));

/**
 * DataGrid Header With Image
 * @returns {JSX.Element} DataGrid Header Component
 */
export const DataGridHeader = (): JSX.Element => (
    <DataGridHeaderBox elevation={1}>
        <StyledImageBox>
            <Box
                component='img'
                src={RockstarSupport}
                alt='rockstar-support-logo'
                height={50}
                width={200}
            />
        </StyledImageBox>
    </DataGridHeaderBox>
);

/**
 * Styled DataGrid Overlay
 */
export const StyledGridDataOverlay = styled('div')(({ theme }) => ({
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

/**
 * DataGrid Now Rows Overlay
 * @returns {JSX.Element} No Rows Overlay Component
 */
export const NoRowsOverlay = (): JSX.Element => (
    <StyledGridDataOverlay>
        <svg width="120" height="100" viewBox="0 0 184 152" aria-hidden focusable="false">
            <g fill="none" fillRule="evenodd">
                <g transform="translate(24 31.67)">
                    <ellipse className="ant-empty-img-5" cx="67.797" cy="106.89" rx="67.797" ry="12.668" />
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
    </StyledGridDataOverlay>
);

/**
 * DataGrid Toolbar
 * @returns {JSX.Element} DataGridToolbar Component
 */
export const DataGridToolbar = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const { showToolbar } = useAppSelector((state) => state.app);
    const handleClick = () => dispatch(appActions.setShowToolbar(!showToolbar));
    return (
        <GridToolbarContainer>
            <ToolTip title={`${showToolbar ? 'Show Toolbar' : 'Hide Toolbar'}`} placement='right' component={
                <IconButton onClick={handleClick} sx={{ color: 'primary.contrastText' }}>
                    {!showToolbar ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>}
            />
            <Divider flexItem orientation='vertical' />
            {!showToolbar ? (
                <Fragment>
                    <Box sx={{ pl: 1 }} />
                    <GridToolbarColumnsButton />
                    <GridToolbarFilterButton />
                    <GridToolbarDensitySelector />
                    <GridToolbarExport />
                </Fragment>
            ) : null}
        </GridToolbarContainer>
    );
};

/**
 * Styled Linear Progress Bar
 */
export const LinearProgress = styled(MuiLinearProgress)(({ theme }) => ({
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[
            theme.palette.mode === 'light' ? 200 : 800
        ],
    },
    [`& .${linearProgressClasses.bar}`]: {
        backgroundColor: theme.custom.palette.main,
    },
}));

/**
 * DataGird Sorted Descending Icon
 * @returns {JSX.Element} SortedDescendingIcon Component
 */
export const SortedDescendingIcon = (): JSX.Element => <ExpandMoreIcon className="icon" />;

/**
 * DataGird Sorted Descending Icon
 * @returns {JSX.Element} SortedAscendingIcon Component
 */
export const SortedAscendingIcon = (): JSX.Element => <ExpandLessIcon className="icon" />;

/**
 * DataGrid Components
 */
export const dataGridComponents = (
    hideToolbar: boolean = false
) => {
    return {
        Toolbar: !hideToolbar ? DataGridToolbar : null,
        ColumnSortedDescendingIcon: SortedDescendingIcon,
        ColumnSortedAscendingIcon: SortedAscendingIcon,
        NoRowsOverlay: NoRowsOverlay,
        LoadingOverlay: LinearProgress,
    };
};

/**
 * Column Header Props Interface
 */
interface ColumnHeaderProps {
    headerName: string | undefined;
};

/**
 * Memoized Column Header
 */
export const ColumnHeader = memo(({ headerName }: ColumnHeaderProps) => (
    <Typography component='strong' variant='body1' sx={{ textTransform: 'capitalize', fontSize: 14, fontWeight: 'bold' }}>
        {headerName}
    </Typography>
));

/**
 * Render DataGrid Column Header
 * @param {GridColumnHeaderParams} params Grid Column Header Params
 * @returns {JSX.Element} Rendered ColumnHeader Component
 */
export function renderColumnHeader(params: GridColumnHeaderParams): JSX.Element {
    return (
        <ColumnHeader headerName={params.colDef.headerName} />
    );
};

/**
 * Styled Data Grid Status Chip
 */
export const StyledStatusChip = styled(Chip)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    '& .MuiChip-label': {
        width: '75px',
        paddingTop: '2px',
        textAlign: 'center',
        fontSize: '12px',
    },
    '& .MuiChip-deleteIcon': {
        color: 'hsl(0deg 0% 98% / 75%)',
    },
}));

/**
 * Memoized Grid Cell Status Chip
 */
export const GridCellStatusChip = memo(({ status }: { status: string; }) => (
    <StyledStatusChip
        label={status.toUpperCase()}
        sx={{
            bgcolor: (theme) => theme.palette.mode === 'dark'
                ? lighten(status.toUpperCase() === 'UP'
                    ? theme.custom.palette.green
                    : status.toUpperCase() === 'DOWN'
                        ? theme.custom.palette.red
                        : theme.custom.palette.orange,
                    theme.palette.action.selectedOpacity
                )
                : darken(status.toUpperCase() === 'UP'
                    ? theme.custom.palette.green
                    : status.toUpperCase() === 'DOWN'
                        ? theme.custom.palette.red
                        : theme.custom.palette.orange,
                    theme.palette.action.focusOpacity
                )

        }}
    />
));

/**
 * Render Grid Cell Status Chip
 * @param {GridRenderCellParams} params Grid Render Cell Params
 * @returns {JSX.Element} Rendered Status Chip Component
 */
export function renderCellStatusChip(params: GridRenderCellParams<typeof Chip>): JSX.Element {
    return <GridCellStatusChip status={params.row.status} />
};

/**
 * Memoized Grid Cell ID
 */
export const GridCellId = memo(({ id }: { id: number; }) => (
    <Typography variant='body2'>{id}</Typography>
));

/**
 * Render Grid Cell ID
 * @param {GridRenderCellParams} params Grid Render Cell Params
 * @returns {JSX.Element} Rendered ID Component
 */
export function renderCellId(params: GridRenderCellParams<typeof Typography>): JSX.Element {
    return (
        <GridCellId id={params.row.id} />
    );
};

/**
 * Create Link Styles
 * @param {Theme} theme MUI Theme
 * @returns Link Styles
 */
export const linkStyles = (theme: Theme) => {
    return {
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
            color: theme.palette.mode === 'dark'
                ? lighten(
                    theme.custom.palette.main,
                    theme.palette.action.disabledOpacity
                )
                : lighten(
                    theme.custom.palette.main,
                    theme.palette.action.focusOpacity
                )
        },
    };
};

/**
 * Grid Cell Props Interface
 */
export interface GridCellProps {
    service: ServiceRow | Status;
};

/**
 * Memoized Grid Cell Link
 */
export const GridCellLink = memo((props: GridCellProps) => {
    const { service: { name, id } } = props;
    const theme = useTheme();
    return (
        <Typography variant='body2' component={Link} to={`/service/${id}`} sx={linkStyles(theme)}>
            {name}
        </Typography>
    );
});

/**
 * Render Grid Cell Link
 * @param {GridRenderCellParams} params Grid Render Cell Params
 * @returns {JSX.Element} Rendered Link Component
 */
export function renderCellLink(params: GridRenderCellParams<typeof Typography>): JSX.Element {
    return (
        <GridCellLink service={params.row} />
    )
};

/**
 * Grid Cell Expand Props Interface
 */
export interface GridCellExpandProps {
    value: string;
    width: number;
};

/**
 * Is Element Overflown
 * @param {Element} element Element
 * @returns {boolean} true or false
 */
export function isOverflown(element: Element): boolean {
    return (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
    );
};

/**
 * Grid Cell Expand With Popper
 */
export const GridCellExpand = memo(function GridCellExpand(
    props: GridCellExpandProps,
) {
    const { width, value } = props;
    const wrapper = useRef<HTMLDivElement | null>(null);
    const cellDiv = useRef(null);
    const cellValue = useRef(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [showFullCell, setShowFullCell] = useState(false);
    const [showPopper, setShowPopper] = useState(false);

    const handleMouseEnter = () => {
        const isCurrentlyOverflown = isOverflown(cellValue.current!);
        setShowPopper(isCurrentlyOverflown);
        setAnchorEl(cellDiv.current);
        setShowFullCell(true);
    };

    const handleMouseLeave = () => {
        setShowFullCell(false);
    };

    useEffect(() => {
        if (!showFullCell) {
            return undefined;
        }

        function handleKeyDown(nativeEvent: KeyboardEvent) {
            // IE11, Edge (prior to using Bink?) use 'Esc'
            if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
                setShowFullCell(false);
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [setShowFullCell, showFullCell]);

    return (
        <Box
            ref={wrapper}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
                alignItems: 'center',
                lineHeight: '24px',
                width: '100%',
                height: '100%',
                position: 'relative',
                display: 'flex',
            }}
        >
            <Box
                ref={cellDiv}
                sx={{
                    height: '100%',
                    width,
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                }}
            />
            <Box
                ref={cellValue}
                sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
                {value}
            </Box>
            {showPopper && (
                <Popper
                    open={showFullCell && anchorEl !== null}
                    anchorEl={anchorEl}
                    style={{
                        width,
                        // marginLeft: -17, // commented out to resolve Popper warning
                        display: 'inline-flex'
                    }}
                    popperOptions={{
                        placement: 'auto'
                    }}
                >
                    <MuiPaper
                        elevation={1}
                        style={{ minHeight: wrapper.current!.offsetHeight - 3 }}
                    >
                        <Typography variant="body2" style={{ padding: 8 }}>
                            {value}
                        </Typography>
                    </MuiPaper>
                </Popper>
            )}
        </Box>
    );
});

/**
 * Render Cell Expand With Popper
 * @param {GridRenderCellParams<string>} params Grid Render Cell Params
 * @returns {JSX.Element} Rendered Cell Expand With Popper Component
 */
export function renderCellExpand(params: GridRenderCellParams<string>): JSX.Element {
    return (
        <GridCellExpand value={params.row.message || ''} width={params.colDef.computedWidth} />
    );
};

/**
 * Grid Cell Text Props
 */
export interface GridCellTextProps {
    text: string;
};

/**
 * Memoized Grid Text
 */
export const GridCellText = memo(({ text }: GridCellTextProps) => (
    <Typography variant='body2'>
        {text}
    </Typography>
));

/**
 * Render Grid Cell Text
 * @param {GridRenderCellParams} params Grid Render Cell Params
 * @returns {JSX.Element} Rendered Text Component
 */
export function renderCellText(params: GridRenderCellParams<typeof Typography>): JSX.Element {
    return (
        <GridCellText text={params.row.service} />
    )
};

/**
 * Get DataGrid Row Background Color
 * @param {string} color Target Color
 * @param {string} mode Palette Mode (light or dark)
 * @returns {string} Background Color
 */
export const getBackgroundColor = (color: string, mode: string): string => {
    return mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);
};

/**
 * Get DataGrid Row Hover Background Color
 * @param {string} color Target Color
 * @param {string} mode Palette Mode (light or dark)
 * @returns {string} Hover Background Color
 */
export const getHoverBackgroundColor = (color: string, mode: string): string => {
    return mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);
};

/**
 * Get Updated Date
 * @description Concatenates First and Last Name
 * @param {GridValueGetterParams} params Grid Value Getter Params
 * @returns {string} Local Date String
 */
export const getUpdatedDate = (params: GridValueGetterParams): string => {
    return `${new Date(params.row.updated).toLocaleString()}`;
};

/**
 * DataGrid Background Styles Theme
 * @param {Theme} theme 
 * @returns Background Styles
 */
export const backgroundStyles = (theme: Theme) => {
    return {
        '& .super-app-theme--UP': {
            bgcolor:
                getBackgroundColor(
                    theme.custom.palette.green,
                    theme.palette.mode
                ),
            '&:hover': {
                bgcolor:
                    getHoverBackgroundColor(
                        theme.custom.palette.green,
                        theme.palette.mode,
                    ),
            },
        },
        '& .super-app-theme--LIMITED': {
            bgcolor:
                getBackgroundColor(
                    theme.custom.palette.yellow,
                    theme.palette.mode
                ),
            '&:hover': {
                bgcolor:
                    getHoverBackgroundColor(
                        theme.custom.palette.yellow,
                        theme.palette.mode,
                    ),
            },
        },
        '& .super-app-theme--DOWN': {
            bgcolor:
                getBackgroundColor(
                    theme.custom.palette.red,
                    theme.palette.mode
                ),
            '&:hover': {
                bgcolor:
                    getHoverBackgroundColor(
                        theme.custom.palette.red,
                        theme.palette.mode
                    ),
            },
        },
    };
};
/* <---------- End Of In Use Components ----------> */
