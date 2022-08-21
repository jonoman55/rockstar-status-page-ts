import { Fragment, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Divider, Grid, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';

import { FlexText } from '../controls';
import { StatusChip } from '../shared';
import { Stack, ServiceCard, UpdatedBox, Title } from '../styled/ServicesCard.styled';
import { appActions } from '../../reducers/appSlice';
import { useAppDispatch } from '../../app/hooks';

import type { Service } from '../../types';

interface ServicesGridItemsProps {
    services: Service[];
    theme: Theme;
};

export const ServicesGridItems: React.FC<ServicesGridItemsProps> = ({ services, theme }): JSX.Element => {
    const dispatch = useAppDispatch();

    const handleClick = useCallback((service: Service) => () => {
        dispatch(appActions.setServicePageId(service.id));
        dispatch(appActions.setIsServiceRoute(true));
        dispatch(appActions.setTargetHref(`/service/${service.id}`));
    }, [dispatch]);

    return (
        <Grid container spacing={2}>
            {services.map((service: Service, index: number) => (
                <Grid
                    component={Link}
                    to={`/service/${service?.id}`}
                    item
                    key={index}
                    xs={12} sm={12} md={12} lg={6} xl={6}
                    onClick={handleClick(service)}
                    sx={{ textDecoration: 'none' }}
                >
                    <ServiceGridItem service={service} theme={theme} />
                </Grid>
            ))}
        </Grid>
    );
};

interface ServiceMessageProps {
    message: string;
};

export const ServiceMessage: React.FC<ServiceMessageProps> = ({ message }): JSX.Element => (
    <Fragment>
        <Divider sx={{ py: 1 }} />
        <Typography sx={{ pt: 2 }}>{message}</Typography>
    </Fragment>
);

interface ServiceGridItemProps {
    service: Service;
    theme: Theme;
};

export const ServiceGridItem: React.FC<ServiceGridItemProps> = ({ service, theme }): JSX.Element => (
    <ServiceCard>
        <Title variant='h6'>{service?.name}</Title>
        <Divider sx={{ py: 1 }} />
        <Stack direction='row' spacing={4}>
            <Typography variant='h6' sx={{ pt: 1, pr: 1 }}>Status</Typography>
            <StatusChip status={`${service?.status.toUpperCase()}`} theme={theme} />
        </Stack>
        {service?.message && <ServiceMessage message={service?.message} />}
        <Divider sx={{ py: 1 }} />
        <UpdatedBox>
            <FlexText sx={{ pr: 1 }}>Updated:</FlexText>
            <FlexText sx={{ pr: 1 }}>{new Date(service?.updated).toLocaleDateString()}</FlexText>
            <FlexText sx={{ pr: 1 }}>{' - '}</FlexText>
            <FlexText>{new Date(service?.updated).toLocaleTimeString()}</FlexText>
        </UpdatedBox>
    </ServiceCard>
);
