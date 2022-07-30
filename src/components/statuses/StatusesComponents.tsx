import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Typography, Divider, Stack, List, ListItemIcon, ListItem, ListItemText, Grid } from '@mui/material';
import { Theme } from '@mui/material/styles';

import { PlatformIcon } from '../shared';
import { FlexText } from '../controls';
import { StatusCard, UpdatedBox, Title, StatusText } from '../styled/StatusesCard.styled';
import { styleStatus } from '../../helpers';

import type { Platform, Status } from '../../types';

export const StatusesGridItems: React.FC<{ statuses: Status[], theme: Theme }> = ({ statuses, theme }) => (
    <Grid container spacing={2}>
        {statuses?.map((status: Status, index: number) => (
            <Grid item key={index} component={NavLink} to={`/service/${status?.id}`} xs={12} sm={12} md={12} lg={12} sx={{
                textDecoration: 'none'
            }}>
                <StatusItem status={status} theme={theme} />
            </Grid>
        ))}
    </Grid>
);

export const StatusItem: React.FC<{ status: Status, theme: Theme }> = ({ status, theme }) => (
    <StatusCard>
        <Title variant='h6'>{status?.name}</Title>
        <Divider sx={{ py: 1 }} />
        <Stack direction='row' sx={{ pt: 1 }}>
            <Typography component='p' sx={{ pt: 1, pr: 1 }}>Status:</Typography>
            <StatusText sx={{ color: `${styleStatus(theme, status?.status?.toLowerCase())}` }}>
                {status?.status}
            </StatusText>
        </Stack>
        <Divider sx={{ py: 1 }} />
        <UpdatedBox>
            <FlexText sx={{ pr: 1 }}>Updated:</FlexText>
            <FlexText sx={{ pr: 1 }}>{new Date(status?.updated).toLocaleDateString()}</FlexText>
            <FlexText sx={{ pr: 1 }}>{' - '}</FlexText>
            <FlexText>{new Date(status?.updated).toLocaleTimeString()}</FlexText>
        </UpdatedBox>
        {status?.services_platforms && (
            <PlatformsListItem
                platforms={status?.services_platforms}
                theme={theme}
            />
        )}
    </StatusCard>
);

export const PlatformsListItem: React.FC<{ platforms: Platform[], theme: Theme; }> = ({ platforms, theme }) => (
    <Box sx={{ py: 1 }}>
        <Divider sx={{ pt: 1 }} />
        <Typography sx={{ py: 2, fontSize: 18 }} variant='h6'>Platforms</Typography>
        {platforms && (
            <Fragment>
                <Divider sx={{ pb: 0 }} />
                <List component='div' sx={{ px: 0 }}>
                    {platforms?.map((p: Platform, idx: number) => (
                        <Fragment key={idx}>
                            <ListItem sx={{ pt: 2 }} disableGutters>
                                <ListItemIcon>
                                    <PlatformIcon platform={p?.name} />
                                </ListItemIcon>
                                <ListItemText>{p.name}</ListItemText>
                                <Typography sx={{ color: `${styleStatus(theme, p?.status?.toLowerCase())}`, pr: 1, fontWeight: 'bold' }}>
                                    {p.status}
                                </Typography>
                            </ListItem>
                            <Divider sx={{ pt: 1 }} />
                        </Fragment>
                    ))}
                </List>
            </Fragment>
        )}
    </Box>
);
