import { useParams } from 'react-router-dom';
import { Paper } from '@mui/material';

const StatusPage = () => {
    const { id } = useParams();
    return (
        <Paper>StatusPage {id}</Paper>
    );
}

export default StatusPage;
