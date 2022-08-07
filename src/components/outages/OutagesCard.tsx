import { Box } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import { Card, CardContent, CardHeader, CardMedia, Paper } from '../styled/PaperCard.styled';

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
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon' },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei' },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime' },
    { id: 4, lastName: 'Stark', firstName: 'Arya' },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys' },
];

// TODO : Finish implement this component
// DOCS : https://mui.com/x/react-data-grid/
const OutagesCard = () => {

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
                    <Box style={{ height: 400, width: '100%' }}>
                        <Box style={{ display: 'flex', height: '100%' }}>
                            <Box style={{ flexGrow: 1 }}>
                                <DataGrid {...data} />
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Paper>
    );
};

export default OutagesCard;
