import { useNavigate } from 'react-router-dom';

import { NotFound } from '../components';

export default function NotFoundPage() {
    const navigate = useNavigate();
    return <NotFound onClick={() => navigate('/')} />;
};