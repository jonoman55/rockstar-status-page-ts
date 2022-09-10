import { Link, useNavigate } from 'react-router-dom';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { Alert, AlertTitle, Box, Collapse, IconButton, Stack, Typography, Theme } from '@mui/material';
import { Close as CloseIcon, Notifications as AlertsIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { orderBy } from 'lodash';

import { ToolTip } from '../controls';
import { ExpandMore } from '../shared';
import { Badge } from '../styled/Sidebar.styled';
import { alertIcon, alertStyles, AppBar, Button, linkStyles, ResetAlertBox, severity, Toolbar } from '../styled/OutageBar.styled';
import { appActions } from '../../reducers/appSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useOverallStatus } from '../../hooks';
import { createAlertMessage } from '../../helpers';

import type { AlertNotification, OutageBarAlert, StatusItem } from '../../types';

export const OutageBar = () => {
    const dispatch = useAppDispatch();

    const {
        outageAlerts,
        activeAlerts,
        resetAlerts,
        resetAlertsOpen,
    } = useAppSelector((state) => state.app);

    const { isLoading, statusItems } = useOverallStatus('getOverallStatus', {
        refetchOnReconnect: true,
        pollingInterval: 1000 * 60 * 5 // 5 min
    });

    const outages: OutageBarAlert[] = useMemo<OutageBarAlert[]>(() => {
        const results: OutageBarAlert[] = [];
        if (!isLoading && statusItems.statuses) {
            statusItems.statuses.forEach((i: StatusItem) =>
                i.type === 'service' && i.status.toLowerCase() !== 'up' && results.push({
                    id: i.id as number,
                    name: i.name as string,
                    status: i.status.toUpperCase() as string,
                    open: true,
                    message: i?.message,
                })
            );
        }
        const orderedResults: OutageBarAlert[] = orderBy(
            results,
            ['status', 'asc']
        );
        return orderedResults;
    }, [isLoading, statusItems.statuses]);

    const resetState = useCallback(() => {
        dispatch(appActions.setActiveAlerts(outages.length));
        dispatch(appActions.setOutageAlerts(outages));
        dispatch(appActions.setActiveOutages(outages));
        dispatch(appActions.setResetAlerts(false));
    }, [dispatch, outages]);

    useEffect(() => {
        if (outages.length !== outageAlerts.length) {
            dispatch(appActions.resetAlertState());
            resetState();
        }
        if (resetAlerts === false && resetAlertsOpen === false && activeAlerts === 0) {
            resetState();
        }
        if (resetAlerts === true && resetAlertsOpen === true && activeAlerts === 0) {
            resetState();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resetAlerts, resetState]);

    return (
        outageAlerts.length > 0 ? (
            <AppBar elevation={2}>
                <Toolbar disableGutters>
                    <OutageAlerts />
                </Toolbar>
            </AppBar>
        ) : null
    );
};

const OutageAlerts = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {
        outageCount,
        activeAlerts,
        activeOutages,
        resetAlertsOpen,
    } = useAppSelector((state) => state.app);

    const [expanded, setExpanded] = useState(false);

    const alertIsOpen = useCallback<(name: string) => boolean>(
        (name: string) => {
            const alert: OutageBarAlert[] = activeOutages.filter(
                (a: OutageBarAlert) => a.name === name
            );
            const open: boolean = alert.shift()?.open as boolean;
            return open;
        },
        [activeOutages]
    );

    const setAlertIsOpen = useCallback<(name: string) => () => void>(
        (name: string) => () => {
            dispatch(appActions.setActiveOutages(activeOutages.filter(
                (a: OutageBarAlert) => a.name !== name && {
                    name: a.name,
                    status: a.status,
                    open: !a.open
                })
            ));
            dispatch(appActions.setActiveAlerts(activeOutages.length - 1));
        },
        [dispatch, activeOutages]
    );

    const handleResetClick = () => dispatch(appActions.setResetAlerts(true));

    const handleExpandClick = () => setExpanded(!expanded);

    const handleOutageClick = () => navigate('/outages');

    return (
        activeAlerts > 0 && activeOutages.length > 0 && resetAlertsOpen ? (
            <Stack direction='column' sx={{ width: '100%' }} spacing={1}>
                {activeOutages.map((o: OutageBarAlert, index: number) => (
                    <OutageAlert
                        key={index}
                        text={createAlertMessage(o)}
                        linkText='— check it out!'
                        to={`/service/${o?.id}`}
                        status={o.status}
                        open={alertIsOpen(o?.name)}
                        setOpen={setAlertIsOpen(o?.name)}
                    />
                ))}
            </Stack>
        ) : (
            <ResetAlertBox>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 1, p: 1 }}>
                    <ToolTip title={!expanded ? 'Expand' : 'Collapse'} placement='bottom' component={
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label='show more'
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>}
                    />
                    <Box sx={{ mx: 1 }} />
                    <ToolTip title='Go To Outages' placement='bottom-start' component={
                        <IconButton onClick={handleOutageClick}>
                            <Badge badgeContent={outageCount}>
                                <AlertsIcon />
                            </Badge>
                        </IconButton>}
                    />
                    <Box sx={{ mr: 1 }} />
                </Box>
                <Collapse in={expanded} timeout='auto' unmountOnExit>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Stack direction='column' spacing={2} sx={{ my: 2 }}>
                            <Typography variant='h6'>There are {outageCount} active alerts. Would you like to see them?</Typography>
                            <Button variant='contained' color='primary' onClick={handleResetClick} startIcon={<AlertsIcon />}>
                                Show Alerts
                            </Button>
                        </Stack>
                    </Box>
                </Collapse>
            </ResetAlertBox>
        )
    );
};

const OutageAlert = ({ text, linkText, to, status, open, setOpen }: AlertNotification) => (
    <Box sx={{ width: '100%' }}>
        <Collapse in={open}>
            <Alert
                severity={severity(status)}
                variant='filled'
                icon={alertIcon(status)}
                action={
                    <IconButton
                        aria-label='close'
                        color='inherit'
                        size='medium'
                        onClick={() => setOpen(false)}
                    >
                        <CloseIcon fontSize='inherit' />
                    </IconButton>
                }
                sx={(theme: Theme) => alertStyles(theme, status)}
            >
                <AlertTitle>{status}</AlertTitle>
                <Typography>
                    {text}
                    <Typography component={Link} to={to} sx={(theme: Theme) => linkStyles(theme)}>
                        &nbsp;{linkText}
                    </Typography>
                </Typography>
            </Alert>
        </Collapse>
    </Box>
);
