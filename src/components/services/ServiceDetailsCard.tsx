import { Card, Paper } from '@mui/material';

// TODO : Implement this component
export const ServiceDetailsCard = ({ id }: { id: number }) => {
    return (
        <Paper elevation={0}>
            <Card elevation={2} sx={{ m: 2, p: 2 }}>
                ServiceDetailsCard {id}
            </Card>
        </Paper>
    );
};