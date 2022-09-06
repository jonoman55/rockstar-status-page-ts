/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useMemo } from 'react';
import { Alert, AlertTitle, Box, Collapse, IconButton, Stack, Typography } from '@mui/material';
import { useTheme, Theme } from '@mui/material/styles';
import { Close as CloseIcon } from '@mui/icons-material';
import { orderBy } from 'lodash';

import { alertIcon, alertStyles, AppBar, Button, linkStyles, ResetAlertBox, severity, Toolbar } from '../styled/OutageBar.styled';
import { appActions } from '../../reducers/appSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useOverallStatus } from '../../hooks';
import { capitalizeFirstLetter } from '../../helpers';

import type { AlertNotification, OutageBarAlert, StatusItem } from '../../types';

// TODO : Fix the state -> reload = reset state
export const OutageBar = () => {
    const dispatch = useAppDispatch();

    const resetAlertsOpen: boolean = useAppSelector((state) => state.app.resetAlertsOpen);
    const activeAlerts: number = useAppSelector((state) => state.app.activeAlerts);
    const activeOutages: OutageBarAlert[] = useAppSelector((state) => state.app.activeOutages);
    const outageAlerts: OutageBarAlert[] = useAppSelector((state) => state.app.outageAlerts);
    const resetAlerts: boolean = useAppSelector((state) => state.app.resetAlerts);

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

    const setState = useCallback(() => {
        dispatch(appActions.setActiveAlerts(outages.length));
        dispatch(appActions.setOutageAlerts(outages));
        dispatch(appActions.setActiveOutages(outages));
        dispatch(appActions.setResetAlerts(false));
    }, [dispatch, outages]);

    const loadState = useCallback(() => {
        if (!isLoading && outages) {
            dispatch(appActions.setOutageAlerts(outages));
        }
        if (!resetAlertsOpen) {
            setState();
        }
    }, [isLoading, outages, resetAlertsOpen, dispatch, setState]);

    useEffect(() => {
        loadState();
    }, [loadState]);

    const handleReset = useCallback<() => void>(() => {
        if (outages.length > 0 && activeOutages.length === 0 && activeAlerts === 0 && resetAlerts === true) {
            setState();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resetAlerts, dispatch, setState]);

    useEffect(() => {
        handleReset();
    }, [handleReset]);

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

// TODO : Finish implementing reset alerts window styling
const OutageAlerts = () => {
    const dispatch = useAppDispatch();

    const resetAlertsOpen: boolean = useAppSelector((state) => state.app.resetAlertsOpen);
    const activeAlerts: number = useAppSelector((state) => state.app.activeAlerts);
    const activeOutages: OutageBarAlert[] = useAppSelector((state) => state.app.activeOutages);

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

    const createMessage = (o: OutageBarAlert): string => {
        return o.message && o?.message !== ''
            ? `${o?.message}`
            : `${o?.name} is ${capitalizeFirstLetter(o?.status?.toLowerCase())}`;
    };

    const handleClick = () => dispatch(appActions.setResetAlerts(true));

    const handleClose = () => dispatch(appActions.setResetAlertsOpen(false));

    const handleOpen = () => dispatch(appActions.setResetAlertsOpen(true));

    return (
        activeAlerts > 0 && activeOutages.length > 0 && resetAlertsOpen ? (
            <Stack direction='column' sx={{ width: '100%' }} spacing={1}>
                {activeOutages.map((o: OutageBarAlert, index: number) => (
                    <OutageAlert
                        key={index}
                        text={createMessage(o)}
                        linkText='— check it out!'
                        to={`/service/${o?.id}`}
                        status={o.status}
                        open={alertIsOpen(o?.name)}
                        setOpen={setAlertIsOpen(o?.name)}
                    />
                ))}
            </Stack>
        ) : activeAlerts === 0 && activeOutages.length === 0 && resetAlertsOpen ? (
            <ResetAlertBox>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton onClick={handleClose} sx={{ mr: 1, mt: 1 }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Stack direction='column' spacing={2} sx={{ my: 2 }}>
                        <Typography variant='h6'>There are active alerts. Would you like to see them?</Typography>
                        <Button variant='contained' color='primary' onClick={handleClick}>
                            Show Alerts
                        </Button>
                    </Stack>
                </Box>
            </ResetAlertBox>
        ) : (
            <ResetAlertBox>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Stack direction='column' spacing={2} sx={{ my: 2 }}>
                        <Button variant='contained' color='primary' onClick={handleOpen}>
                            Show Alerts Window
                        </Button>
                    </Stack>
                </Box>
            </ResetAlertBox>
        )
    );
};

const OutageAlert = ({ text, linkText, to, status, open, setOpen }: AlertNotification) => {
    const theme: Theme = useTheme();
    return (
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
                    sx={{ ...alertStyles(theme, status) }}
                >
                    <AlertTitle>{status}</AlertTitle>
                    <Typography>
                        {text}
                        <Typography component={Link} to={to} sx={linkStyles(theme)}>
                            &nbsp;{linkText}
                        </Typography>
                    </Typography>
                </Alert>
            </Collapse>
        </Box>
    );
};
