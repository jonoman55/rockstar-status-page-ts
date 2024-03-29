import { Fragment, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Divider, List, ListItemIcon, ListItem, ListItemText, Grid } from '@mui/material';

import { FlexText } from '../controls';
import { PlatformIcon, StatusChip } from '../shared';
import { Stack, StatusCard, UpdatedBox, Title } from '../styled/StatusesCard.styled';
import { appActions } from '../../reducers/appSlice';
import { useAppDispatch } from '../../app/hooks';

import type { Platform, Status } from '../../types';

export const StatusesGridItems: React.FC<{ statuses: Status[]; }> = ({ statuses }): JSX.Element => {
    const dispatch = useAppDispatch();

    const handleClick = useCallback(
        (status: Status) => () => {
            dispatch(appActions.setServicePageId(status.id));
            dispatch(appActions.setIsServiceRoute(true));
            dispatch(appActions.setTargetHref(`/service/${status.id}`));
        },
        [dispatch]
    );

    return (
        <Grid container spacing={2}>
            {statuses?.map((status: Status, index: number) => (
                <Grid
                    key={index}
                    item
                    component={Link}
                    to={`/service/${status?.id}`}
                    xs={12} sm={12} md={12} lg={12} xl={12}
                    onClick={handleClick(status)}
                    sx={{ textDecoration: 'none' }}
                >
                    <StatusItem status={status} />
                </Grid>
            ))}
        </Grid>
    );
};

export const StatusItem: React.FC<{ status: Status; }> = ({ status }): JSX.Element => (
    <StatusCard>
        <Title variant='h6'>{status?.name}</Title>
        <Divider sx={{ py: 1 }} />
        <Stack direction='row' spacing={4}>
            <Typography variant='h6' sx={{ pt: 1, pr: 1 }}>Status</Typography>
            <StatusChip status={`${status?.status.toUpperCase()}`} />
        </Stack>
        <Divider sx={{ py: 1 }} />
        <UpdatedBox>
            <FlexText sx={{ pr: 1 }}>Updated:</FlexText>
            <FlexText sx={{ pr: 1 }}>{new Date(status?.updated).toLocaleDateString()}</FlexText>
            <FlexText sx={{ pr: 1 }}>{' - '}</FlexText>
            <FlexText>{new Date(status?.updated).toLocaleTimeString()}</FlexText>
        </UpdatedBox>
        {status?.services_platforms && <PlatformsListItem platforms={status?.services_platforms} />}
    </StatusCard>
);

export const PlatformsListItem: React.FC<{ platforms: Platform[]; }> = ({ platforms }): JSX.Element => (
    <Box sx={{ py: 1 }}>
        <Divider sx={{ pt: 1 }} />
        <Typography sx={{ py: 2, fontSize: 18 }} variant='h6'>Platforms</Typography>
        {platforms && (
            <Fragment>
                <Divider sx={{ pb: 0 }} />
                <List component='div' sx={{ p: 0 }}>
                    {platforms?.map((p: Platform, idx: number) => (
                        <Fragment key={idx}>
                            <ListItem sx={{ pt: 2 }} disableGutters>
                                <ListItemIcon>
                                    <PlatformIcon platform={p?.name} />
                                </ListItemIcon>
                                <ListItemText>{p.name}</ListItemText>
                                <StatusChip status={`${p.status.toUpperCase()}`} />
                            </ListItem>
                            <Divider sx={{ pt: 1 }} />
                        </Fragment>
                    ))}
                </List>
            </Fragment>
        )}
    </Box>
);
