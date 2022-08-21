import { useNavigate } from 'react-router-dom';

import { NotFoundCard } from '../components';

export default function NotFoundPage(): JSX.Element {
    const navigate = useNavigate();
    return <NotFoundCard onClick={() => navigate('/')} />;
};