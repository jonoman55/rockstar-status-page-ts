import { Card, Paper } from '@mui/material';

// TODO : Implement this component
// DOCS : https://github.com/jonoman55/rockstar-status-page/blob/master/src/components/cards/ServicePageCard.jsx
export const ServiceDetailsCard: React.FC<{ id: number; }> = ({ id }) => {
    return (
        <Paper elevation={0}>
            <Card elevation={2} sx={{ m: 2, p: 2 }}>
                ServiceDetailsCard {id}
            </Card>
        </Paper>
    );
};