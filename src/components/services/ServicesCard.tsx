import { useCallback, useMemo } from 'react';
import { Theme, useTheme } from '@mui/material';

import { RockstarSpinner } from '../design';
import { ServicesGridItems } from './ServicesComponents';
import { Paper, Card, CardHeader, CardMedia, CardFooter } from '../styled/PaperCard.styled';
import { CardContent } from '../styled/ServicesCard.styled';
import { useGetServicesQuery } from '../../services/rockstarApi';
import { getHighestStatusCount } from '../../helpers';

import type { Service, StatusItem, StatusItems, StatusType } from '../../types';

export const ServicesCard: React.FC = (): JSX.Element => {
    const theme: Theme = useTheme();

    const { data: servicesResults, isLoading: servicesIsLoading, refetch } = useGetServicesQuery('getServices', {
        refetchOnReconnect: true,
        pollingInterval: 1000 * 60 * 5 // 5 min
    });

    /**
     * Get Services
     */
    const services: Service[] = useMemo<Service[]>(() => {
        const results: Service[] = [];
        if (!servicesIsLoading && servicesResults) {
            servicesResults.forEach((service: Service) => {
                results.push(service);
            });
        }
        return results;
    }, [servicesResults, servicesIsLoading]);

    /**
     * Get Overall Status
     */
    const overallStatus: StatusType = useMemo<StatusType>(
        () => {
            // Initial State
            let statusItems: StatusItems = {
                statuses: []
            };
            // Add Service Statuses to state
            if (!servicesIsLoading && services) {
                services.forEach(
                    (s) => statusItems.statuses.push({
                        name: s.name,
                        status: s.status.toLowerCase(),
                    })
                );
            }
            // Get All Statuses from state
            const statuses: StatusItem[] = Object.values(statusItems.statuses);
            // Get All Status Values
            const allStatusValues = statuses.map((v) => v.status.toLowerCase());
            // Check if Service and Status statuses are all UP
            const isOverallAllUp: boolean = allStatusValues.every((v) => v === 'up');
            // All UP
            if (isOverallAllUp) return 'up';
            // Service DOWN
            if (allStatusValues.includes('down')) return 'down';
            // Service LIMITED
            if (allStatusValues.includes('limited')) return 'limited';
            // Get highest status value count
            const highestValue = getHighestStatusCount(allStatusValues) as StatusType;
            // return highest status
            return highestValue;
        },
        [services, servicesIsLoading]
    );

    /**
     * Handle Refetch
     */
    const handleRefreshClick = useCallback<() => void>(() => {
        refetch();
    }, [refetch]);

    return servicesIsLoading ? <RockstarSpinner /> : (
        <Paper elevation={0}>
            <Card>
                <CardHeader
                    title='Rockstar Services'
                    subheader={`${new Date().toLocaleString()}`}
                    status={overallStatus}
                    onRefreshClick={handleRefreshClick}
                />
                <CardMedia id={6} />
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
