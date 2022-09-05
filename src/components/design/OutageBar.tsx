import { Link } from 'react-router-dom';
import { useState } from 'react';
import { AppBar, Alert, AlertTitle, Box, Collapse, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { Error, OfflineBolt, Close as CloseIcon } from '@mui/icons-material';

type TOutage = {
    name: string;
    id: number;
    status: string;
};

const outageAlerts: TOutage[] = [
    { name: 'Rockstar Games Launcher', id: 6, status: 'DOWN' },
    { name: 'Grand Theft Auto Online', id: 3, status: 'LIMITED' },
    { name: 'Red Dead Online', id: 2, status: 'LIMITED' },
];

export const OutageBar = () => {
    const outages: TOutage[] = outageAlerts;
    return (
        <AppBar component='div' position='static' elevation={2} sx={{ bgcolor: 'transparent', my: 2, backgroundImage: 'none' }}>
            <Toolbar disableGutters sx={{ bgcolor: 'transparent' }}>
                <OutageAlerts outages={outages} />
            </Toolbar>
        </AppBar>
    );
};

const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
};

const OutageAlerts = ({ outages }: { outages: TOutage[]; }) => (
    outages.length > 0 ? (
        <Stack sx={{ width: '100%' }} spacing={1}>
            {outages.map((o: TOutage, index: number) => (
                <OutageAlert
                    key={index}
                    text={`${o.name} is ${capitalizeFirstLetter(o.status.toLowerCase())} — `}
                    linkText='check it out!'
                    to={`/service/${o.id}`}
                    status={o.status}
                />
            ))}
        </Stack>
    ) : null
);

type TOutageAlert = {
    text: string;
    linkText: string;
    to: string;
    status: string;
};

const OutageAlert = ({ text, linkText, to, status }: TOutageAlert) => {
    const [open, setOpen] = useState(true);

    const bgcolor = (status: string) => {
        if (status.toLowerCase() === 'down') return 'error.dark';
        if (status.toLowerCase() === 'limited') return 'warning.main';
    };

    const icon = (status: string) => {
        if (status.toLowerCase() === 'down') return <Error fontSize="inherit" />;
        if (status.toLowerCase() === 'limited') return <OfflineBolt fontSize="inherit" />;
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Collapse in={open}>
                <Alert
                    severity="warning"
                    variant="filled"
                    icon={icon(status)}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="medium"
                            onClick={() => setOpen(false)}
                        >
                            <CloseIcon fontSize="inherit" />
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
