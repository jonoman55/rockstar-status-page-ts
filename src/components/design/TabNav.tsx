import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar } from '@mui/material';

import { a11yProps, Tabs, Tab, Paper } from '../styled/TabNav.styled';
import { appActions } from '../../reducers/appSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { usePathname } from '../../hooks';

export const TabNav = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const pathname = usePathname();

    const { tabValue, targetHref } = useAppSelector((state) => state.app);

    useEffect(() => {
        if (tabValue === 0) {
            navigate('/all');
        }
        if (tabValue === 1) {
            navigate('/services');
        }
        if (tabValue === 2) {
            navigate('/statuses');
        }
        if (tabValue === 3) {
            navigate('/api');
        }
        if (targetHref === '/outages') {
            navigate(targetHref);
        }
    }, [tabValue, pathname, targetHref, navigate]);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        dispatch(appActions.setTabValue(newValue));
    };

    return (
        <AppBar component='div' position='relative' elevation={1}>
            <Paper>
                <Tabs value={tabValue} onChange={handleChange}>
                    <Tab label="All" {...a11yProps(0)} />
                    <Tab label="Services" {...a11yProps(1)} />
                    <Tab label="Statuses" {...a11yProps(2)} />
                    <Tab label="API" {...a11yProps(3)} />
                </Tabs>
            </Paper>
        </AppBar>
    );
};
