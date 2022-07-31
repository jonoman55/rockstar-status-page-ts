import { useCallback, useMemo } from 'react';
import { useTheme } from '@mui/material';

import { RockstarSpinner } from '../design';
import { PlatformsListItem } from '../statuses';
import { Footer, HtmlMessage, CardImage, StatusesList } from './ServiceDetailsComponents';
import { CardHeader } from '../styled/PaperCard.styled';
import { Card, CardContent, Paper } from '../styled/ServiceDetailsCard.styled';
import { useGetStatusQuery } from '../../services/rockstarApi';
import { RockstarStatus } from '../../constants';

import type { Service, StatusType } from '../../types';

interface Props {
    service: Service,
    serviceId: number;
    refetchService: () => void;
};

export const ServiceDetailsCard: React.FC<Props> = ({ serviceId, service, refetchService }) => {
    const theme = useTheme();

    const { data, isLoading, refetch } = useGetStatusQuery(serviceId, {
        refetchOnReconnect: true,
        pollingInterval: 1000 * 60 * 5 // 5 min
    });

    const statusStatus = useMemo<StatusType>(() => {
        let result: StatusType;
        if (!isLoading && data) {
            result = data?.status?.toLowerCase() as StatusType;
        }
        return result;
    }, [data, isLoading]);

    const serviceStatus = useMemo<StatusType>(() => {
        let result: StatusType;
        if (service) {
            result = service?.status?.toLowerCase() as StatusType;
        }
        return result;
    }, [service]);

    const overallStatus = useMemo<RockstarStatus>(() => {
        if (statusStatus === 'up' && serviceStatus === 'up') {
            return RockstarStatus.UP;
        }
        if (statusStatus === 'down' && serviceStatus === 'down') {
            return RockstarStatus.DOWN;
        }
        if (statusStatus === 'limited' && serviceStatus === 'limited') {
            return RockstarStatus.LIMITED;
        }
        return RockstarStatus.UP;
    }, [serviceStatus, statusStatus]);

    const handleClick = useCallback(() => {
        refetch();
        refetchService();
    }, [refetch, refetchService]);

    return isLoading ? <RockstarSpinner /> : (
        <Paper elevation={0}>
            <Card>
                <CardHeader
                    title={`${data?.name}`}
                    subheader={`${new Date().toLocaleString()}`}
                    status={overallStatus as StatusType}
                    onClick={handleClick}
                />
                <CardImage id={serviceId} />
                {data?.message && (
                    <HtmlMessage message={data?.message} />
                )}
                <CardContent>
                    <StatusesList
                        status={statusStatus}
                        service={serviceStatus}
                        theme={theme}
                    />
                    {data?.services_platforms && (
                        <PlatformsListItem
                            platforms={data?.services_platforms}
                            theme={theme}
                        />
                    )}
                </CardContent>
                <Footer />
            </Card>
        </Paper>
    );
};
