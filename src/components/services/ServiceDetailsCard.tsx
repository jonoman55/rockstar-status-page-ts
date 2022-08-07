import { useCallback, useMemo } from 'react';
import { Divider, useTheme } from '@mui/material';

import { RockstarSpinner } from '../design';
import { PlatformsListItem } from '../statuses';
import { Footer, HtmlMessage, CardImage, StatusesList } from './ServiceDetailsComponents';
import { CardHeader } from '../styled/PaperCard.styled';
import { Card, CardContent, Paper } from '../styled/ServiceDetailsCard.styled';
import { useGetStatusQuery } from '../../services/rockstarApi';
import { fetchStatus } from '../../helpers';

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
            result = fetchStatus(service?.status?.toLowerCase() as StatusType);
        }
        return result;
    }, [service]);

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
                    status={serviceStatus as StatusType}
                    onClick={handleClick}
                />
                <CardImage id={serviceId} />
                {data?.message && (
                    <HtmlMessage message={data?.message} />
                )}
                <CardContent>
                    <Divider sx={{ pb: 2 }} />
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
