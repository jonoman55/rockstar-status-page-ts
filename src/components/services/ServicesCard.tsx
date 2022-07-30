import React, { useMemo } from 'react';
import { useTheme } from '@mui/material';

import { RockstarSpinner } from '../design';
import { ServicesGridItems } from './ServicesComponents';
import { Paper, Card, CardHeader, CardMedia, CardFooter } from '../styled/PaperCard.styled';
import { CardContent } from '../styled/ServicesCard.styled';
import { useGetServicesQuery } from '../../services/rockstarApi';
import { getStatusesCount } from '../../helpers';
import { RockstarStatus } from '../../constants';

import type { Service, StatusType } from '../../types';

export const ServicesCard: React.FC = () => {
    const theme = useTheme();

    const { data: servicesResults, isLoading: servicesIsLoading, refetch } = useGetServicesQuery('getServices', {
        refetchOnReconnect: true,
        pollingInterval: 1000 * 60 * 5 // 5 min
    });

    const services = useMemo<Service[]>(() => {
        const results: Service[] = [];
        if (!servicesIsLoading && servicesResults) {
            servicesResults.forEach((service: Service) => {
                results.push(service);
            });
        }
        return results;
    }, [servicesResults, servicesIsLoading]);

    const overallStatus = useMemo<StatusType>(() => {
        let result: StatusType;
        if (!servicesIsLoading && services) {
            const highest = getStatusesCount(
                services.map((s: Service) => {
                    return s?.status?.toLowerCase() as RockstarStatus;
                })
            );
            result = highest?.toString().toLowerCase() as StatusType;
        }
        return result;
    }, [services, servicesIsLoading]);

    return servicesIsLoading ? <RockstarSpinner /> : (
        <Paper elevation={0}>
            <Card>
                <CardHeader
                    title='Rockstar Services'
                    subheader={`${new Date().toLocaleString()}`}
                    status={overallStatus as StatusType}
                    onClick={refetch}
                />
                <CardMedia id={0} />
                <CardContent>
                    {services && (
                        <ServicesGridItems
                            services={services}
                            theme={theme}
                        />
                    )}
                </CardContent>
                <CardFooter />
            </Card>
        </Paper>
    );
};
