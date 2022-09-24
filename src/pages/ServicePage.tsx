import { useMemo, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import { NavBar, RockstarSpinner, ServiceDetailsCard } from '../components';
import { useServicesQuery } from '../hooks';
import { ServiceQueryProps } from '../interfaces';
import type { Service } from '../types';

const ServicePage = (): JSX.Element => {
    const { id } = useParams();

    const serviceId: number = useMemo<number>(
        () => parseInt(id as string),
        [id]
    );

    const { services, isLoading, refetch, isFetching } = useServicesQuery() as ServiceQueryProps;

    const service: Service = useMemo<Service>(() => {
        let result: Service[] = [];
        if (!isLoading && services) {
            result.push(services.filter(
                (s: Service) => s.id === serviceId).shift() as Service
            );
        }
        return result.shift() as Service;
    }, [isLoading, serviceId, services]);

    return isLoading || isFetching ? <RockstarSpinner /> : (
        <Fragment>
            <NavBar
                services={services}
            />
            <ServiceDetailsCard
                service={service}
                serviceId={serviceId}
                refetchServices={refetch}
            />
        </Fragment>
    );
};

export default ServicePage;
