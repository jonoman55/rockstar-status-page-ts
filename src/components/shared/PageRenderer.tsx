import { useNavigate } from 'react-router-dom';

import { Home, Services, Statuses, Api, NotFound } from '..';

interface Props {
    name: string;
};

export const PageRenderer = ({ name }: Props) => {
    const navigate = useNavigate();
    if (name === 'All') return <Home />;
    if (name === 'Services') return <Services />;
    if (name === 'Statuses') return <Statuses />;
    if (name === 'Api') return <Api />;
    return <NotFound onClick={() => navigate('/')} />;
};