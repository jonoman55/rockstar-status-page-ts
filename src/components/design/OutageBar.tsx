import { Link } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AppBar, Alert, AlertTitle, Box, Collapse, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { Error, OfflineBolt, Close as CloseIcon } from '@mui/icons-material';
import { orderBy } from 'lodash';

import { useOverallStatus } from '../../hooks';
import { capitalizeFirstLetter } from '../../helpers';

import type { AlertNotification, OutageBarAlert, StatusItem } from '../../types';

// TODO : Finish implementing the OutageBar
// TODO : Move useState instances to appSlice reducer
// TODO : Finish styling the Outage Alert
// TODO : Create separate components for OutageAlerts and OutageAlert
// TODO : Add functionality to detect new outages and display alert
// TODO : Convert to styled components
// TODO : Add functionality to reopen closed alerts
export const OutageBar = () => {
    const [alerts, setAlerts] = useState<number>(0);

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
                })
            );
        }
        return orderBy(results, ['status', 'asc']);
    }, [isLoading, statusItems.statuses]);

    useEffect(() => {
        if (!isLoading && outages) setAlerts(outages.length);
    }, [isLoading, outages]);

    return (
        outages.length > 0 && alerts > 0 ? (
            <AppBar component='div' position='static' elevation={2} sx={{ bgcolor: 'transparent', mt: 3, mb: 1.5, backgroundImage: 'none' }}>
                <Toolbar disableGutters sx={{ bgcolor: 'transparent' }}>
                    <OutageAlerts outages={outages} setAlerts={setAlerts} />
                </Toolbar>
            </AppBar>
        ) : null
    );
};

interface OutageAlertsProps {
    outages: OutageBarAlert[];
    setAlerts: React.Dispatch<React.SetStateAction<number>>;
};

const OutageAlerts = ({ outages, setAlerts }: OutageAlertsProps) => {
    const [openAlerts, setOpenAlerts] = useState<OutageBarAlert[]>(outages);

    const alertIsOpen = useCallback<(name: string) => boolean>(
        (name: string) => {
            const alert: OutageBarAlert[] = openAlerts.filter(
                (a: OutageBarAlert) => a.name === name
            );
            const open: boolean = alert.shift()?.open as boolean;
            return open;
        },
        [openAlerts]
    );

    const setAlertIsOpen = useCallback<(name: string) => () => void>(
        (name: string) => () => {
            return setOpenAlerts(openAlerts.filter(
                (a: OutageBarAlert) => a.name !== name && {
                    name: a.name,
                    status: a.status,
                    open: !a.open
                })
            );
        },
        [openAlerts, setOpenAlerts]
    );

    const setAlertsCount = useCallback<() => void>(
        () => setAlerts(openAlerts.length),
        [openAlerts, setAlerts]
    );

    useEffect(() => {
        setAlertsCount();
    }, [openAlerts, setAlertsCount]);

    return (
        outages.length > 0 ? (
            <Stack sx={{ width: '100%' }} spacing={1}>
                {outages.map((o: OutageBarAlert, index: number) => (
                    <OutageAlert
                        key={index}
                        text={`${o.name} is ${capitalizeFirstLetter(o.status.toLowerCase())} — `}
                        linkText='check it out!'
                        to={`/service/${o.id}`}
                        status={o.status}
                        open={alertIsOpen(o.name)}
                        setOpen={setAlertIsOpen(o.name)}
                    />
                ))}
            </Stack>
        ) : null
    );
};

// TODO : Move bgcolor and icon functions to helper file as CSSObjects
// TODO : Covert to styled components
const OutageAlert = ({ text, linkText, to, status, open, setOpen }: AlertNotification) => {
    const bgcolor = (status: string) => {
        if (status.toLowerCase() === 'down') return 'error.dark';
        if (status.toLowerCase() === 'limited') return 'warning.main';
    };

    const icon = (status: string) => {
        if (status.toLowerCase() === 'down') return <Error fontSize='inherit' />;
        if (status.toLowerCase() === 'limited') return <OfflineBolt fontSize='inherit' />;
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Collapse in={open}>
                <Alert
                    severity='warning'
                    variant='filled'
                    icon={icon(status)}
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
                    sx={{ color: 'common.white', bgcolor: bgcolor(status) }}
                >
                    <AlertTitle>{status}</AlertTitle>
                    <Stack direction='row'>
                        <Typography>{text}</Typography>
                        <Typography component={Link} to={to} sx={{
                            textDecoration: 'none', color: 'common.white', '&:hover': { color: 'common.black' }
                        }}>
                            &nbsp;{linkText}
                        </Typography>
                    </Stack>
                </Alert>
            </Collapse>
        </Box>
    );
};
