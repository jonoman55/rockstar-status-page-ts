import { useNavigate } from 'react-router-dom';

import { NotFoundCard } from '../components';

const NotFoundPage = (): JSX.Element => {
    const navigate = useNavigate();
    return <NotFoundCard onClick={() => navigate('/')} />;
};

export default NotFoundPage;
