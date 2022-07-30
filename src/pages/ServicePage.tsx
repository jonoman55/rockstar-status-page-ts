import { useMemo, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import { NavBar, RockstarSpinner, ServiceDetailsCard } from '../components';
import { useServices } from '../hooks';

const StatusPage = () => {
    const { id } = useParams();
    const serviceId = useMemo(() => parseInt(id as string), [id]);
    const { isLoading, services } = useServices();
    return isLoading ? <RockstarSpinner /> : (
        <Fragment>
            <NavBar services={services} />
            <ServiceDetailsCard id={serviceId} />
        </Fragment>
    );
};

export default StatusPage;
