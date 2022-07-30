import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme, Box, Divider, Grid, Stack, Typography } from '@mui/material';

import { RockstarSpinner } from '../design';
import { FlexText } from '../controls';
import { Paper, Card, CardHeader, CardMedia, CardContent, CardFooter } from '../styled/PaperCard.styled';
import { useGetServicesQuery } from '../../services/rockstarApi';
import { getStatusesCount, styleStatus } from '../../helpers';
import { RockstarStatus } from '../../constants';

import type { Service, StatusType } from '../../types';

// TODO : Finish Implement this component and covert to styled to styled components
export const ServicesCard = () => {
    const { data: servicesResults, isLoading: servicesIsLoading, refetch } = useGetServicesQuery('getAllServices', {
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
        let result: StatusType = 'up';
        if (!servicesIsLoading && services) {
            const highest = getStatusesCount(services.map(
                (s: Service) =>
                    s.status.toLowerCase() as RockstarStatus
            ));
            result = highest?.toString().toLowerCase() as StatusType;
        }
        return result;
    }, [services, servicesIsLoading]);

    return servicesIsLoading ? <RockstarSpinner /> : (
        <Paper elevation={0}>
            <Card>
                <CardHeader
                    title='Services Status'
                    subheader={`${new Date().toLocaleString()}`}
                    status={overallStatus as StatusType}
                    onClick={refetch}
                />
                <CardMedia id={0} />
                <CardContent sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', pt: 4, px: 2, mt: 2 }}>
                    <Grid container spacing={2}>
                        {services.map((service: Service, index: number) => (
                            <Grid component={NavLink} to={`/service/${service?.id}`} item key={index} xs={12} sm={12} md={12} lg={6} sx={{
                                textDecoration: 'none', p: 1, color: (theme) => theme.custom.palette.main
                            }}>
                                <ServiceItem service={service} />
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
                <CardFooter />
            </Card>
        </Paper>
    );
};

const ServiceItem = ({ service }: { service: Service }) => {
    const theme = useTheme();
    return (
        <Paper sx={{
            p: 2, color: 'primary.contrastText', bgcolor: 'primary.main', minHeight: '325px',
            '&:hover': { color: 'primary.contrastText', bgcolor: 'action.disabled', opacity: 1 }
        }}>
            <Typography variant='h6' sx={{ color: (theme) => theme.custom.palette.main, textDecoration: 'none', pt: 1 }}>
                {service?.name}
            </Typography>
            <Divider sx={{ py: 1 }} />
            <Stack direction='row' sx={{ pt: 1 }}>
                <Typography component='p' sx={{ pt: 1, pr: 1 }}>Status:</Typography>
                <Typography sx={{
                    color: `${styleStatus(theme, service?.status?.toLowerCase())}`, pt: 1,
                    fontWeight: 'bold', textTransform: 'uppercase'
                }}>
                    {service?.status}
                </Typography>
            </Stack>
            {service?.message && (
                <Box>
                    <Divider sx={{ py: 1 }} />
                    <Typography sx={{ pt: 2 }}>{service?.message}</Typography>
                </Box>
            )}
            <Divider sx={{ py: 1 }} />
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', py: 1 }}>
                <FlexText sx={{ pr: 1 }}>Updated:</FlexText>
                <FlexText sx={{ pr: 1 }}>{new Date(service?.updated).toLocaleDateString()}</FlexText>
                <FlexText sx={{ pr: 1 }}>{' - '}</FlexText>
                <FlexText>{new Date(service?.updated).toLocaleTimeString()}</FlexText>
            </Box>
        </Paper>
    );
};
