import { useCallback, useMemo } from 'react';
import { Divider } from '@mui/material';

import { FlexText } from '../controls';
import { RockstarSpinner } from '../design';
import { PlatformsListItem } from '../statuses';
import { Footer, HtmlMessage, CardImage, StatusesList } from './ServiceDetailsComponents';
import { UpdatedBox } from '../styled/StatusesCard.styled';
import { CardHeader } from '../styled/PaperCard.styled';
import { Card, CardContent, Paper } from '../styled/ServiceDetailsCard.styled';
import { useGetStatusQuery } from '../../services/rockstarApi';
import { fetchStatus, getHighestStatusCount } from '../../helpers';

import type { Platform, Service, StatusItem, StatusItems, StatusType } from '../../types';

/**
 * Service Details Card Props
 */
interface IServiceDetailsCardProps {
    /**
     * Rockstar Service
     */
    service: Service,
    /**
     * Service ID
     */
    serviceId: number;
    /**
     * Refetch Function
     */
    refetchService: () => void;
};

/**
 * Service Details Card
 */
export const ServiceDetailsCard: React.FC<IServiceDetailsCardProps> = ({ serviceId, service, refetchService }): JSX.Element => {
    const { data, isLoading, refetch } = useGetStatusQuery(serviceId, {
        refetchOnReconnect: true,
        pollingInterval: 1000 * 60 * 5 // 5 min
    });

    /**
     * Get Status's Status
     */
    const statusStatus: StatusType = useMemo<StatusType>(() => {
        let result: StatusType;
        if (!isLoading && data) {
            result = data?.status?.toLowerCase() as StatusType;
        }
        return result;
    }, [data, isLoading]);

    /**
     * Get Service's Status
     */
    const serviceStatus: StatusType = useMemo<StatusType>(() => {
        let result: StatusType;
        if (service) {
            result = fetchStatus(service?.status?.toLowerCase() as StatusType);
        }
        return result as StatusType;
    }, [service]);

    /**
     * Get Platforms
     */
    const platforms: Platform[] = useMemo<Platform[]>(() => {
        const results: Platform[] = [];
        if (!isLoading && data?.services_platforms) {
            data?.services_platforms.forEach(
                (p: Platform) => results.push(p)
            );
        }
        return results;
    }, [isLoading, data]);

    /**
     * Get Overall Status
     */
    const overallStatus: StatusType = useMemo<StatusType>(
        () => {
            // Initial State
            let statusItems: StatusItems = {
                statuses: []
            };
            // Add Service and Status values to state
            if (serviceStatus && statusStatus) {
                const service_status: string = serviceStatus?.toString() as string;
                const status_status: string = statusStatus?.toString() as string;
                statusItems.statuses = [
                    { name: 'Service', status: service_status },
                    { name: 'Status', status: status_status },
                ];
            }
            // Add Platform values to state
            if (!isLoading && data && data?.services_platforms) {
                data?.services_platforms.forEach((p: Platform) => {
                    statusItems.statuses.push({
                        name: p.name,
                        status: p.status.toLowerCase(),
                    });
                });
            }
            // Get All Statuses from state
            const statuses: StatusItem[] = Object.values(statusItems.statuses);
            // Get All Status Values
            const allStatusValues = statuses.map((v) => v.status.toLowerCase());
            // Get Service and Status values
            const overallValues: StatusItem[] = Object.values(statuses).filter(
                (v) => v.name === 'Service' || v.name === 'Status'
            );
            // Get Service and Status statuses
            const overallStatusValues: string[] = overallValues.map((s) => s.status);
            // Check if Service and Status statuses are all UP
            const isOverallAllUp: boolean = overallValues.every((v) => v.status === 'up');
            // Get Platform values
            const platformValues: StatusItem[] = Object.values(statuses).filter(
                (v) => v.name !== 'Service' && v.name !== 'Status'
            );
            // Get Platform statuses
            const platformStatusValues: string[] = platformValues.map((s) => s.status);
            // Check if Platform statuses are all UP
            const isPlatformsAllUp: boolean = platformValues.every((v) => v.status === 'up');
            // All UP
            if (isOverallAllUp && isPlatformsAllUp) return 'up';
            // Service OR Status DOWN
            if (overallStatusValues.includes('down')) return 'down';
            // Service OR Status LIMITED
            if (overallStatusValues.includes('limited')) return 'limited';
            // Service/Status AND Platforms DOWN
            if (overallStatusValues.includes('down') && platformStatusValues.includes('down')) return 'down';
            // Service/Status AND Platforms LIMITED
            if (overallStatusValues.includes('limited') && platformStatusValues.includes('limited')) return 'limited';
            // Get highest status value count
            const highestValue = getHighestStatusCount(allStatusValues) as StatusType;
            // return highest status
            return highestValue;
        },
        [isLoading, data, serviceStatus, statusStatus]
    );

    /**
     * Handle Refetch
     */
    const handleRefreshClick = useCallback(() => {
        refetch();
        refetchService();
    }, [refetch, refetchService]);

    return isLoading ? <RockstarSpinner /> : (
        <Paper elevation={0}>
            <Card>
                <CardHeader
                    title={`${data?.name}`}
                    subheader={`${new Date().toLocaleString()}`}
                    status={overallStatus}
                    onRefreshClick={handleRefreshClick}
                    disabledAvatarClick={true}
                />
                <CardImage id={serviceId} />
                {data?.message && <HtmlMessage message={data?.message} />}
                <CardContent>
                    <Divider sx={{ pb: 2 }} />
                    <UpdatedBox>
                        <FlexText sx={{ pr: 1 }}>Updated:</FlexText>
                        <FlexText sx={{ pr: 1 }}>{new Date(service?.updated).toLocaleDateString()}</FlexText>
                        <FlexText sx={{ pr: 1 }}>{' - '}</FlexText>
                        <FlexText>{new Date(service?.updated).toLocaleTimeString()}</FlexText>
                    </UpdatedBox>
                    <Divider sx={{ pb: 2 }} />
                    <StatusesList
                        status={statusStatus}
                        service={serviceStatus}
                    />
                    {platforms.length > 0 && <PlatformsListItem platforms={platforms} />}
                </CardContent>
                <Footer />
            </Card>
        </Paper>
    );
};
