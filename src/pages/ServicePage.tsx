import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { ServiceDetailsCard } from '../components';

// TODO : Add page wrapper with ToggleButtonToolbar
const StatusPage = () => {
    const { id } = useParams();
    const serviceId = useMemo(() => parseInt(id as string), [id]);
    return (
        <ServiceDetailsCard id={serviceId} />
    );
}

export default StatusPage;
