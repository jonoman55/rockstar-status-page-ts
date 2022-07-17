import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Tabs, Paper } from '@mui/material';

import { a11yProps, Tab } from '../styled/TabNav.styled';
import { appActions } from '../../reducers/appSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export const TabNav = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { tabValue } = useAppSelector((state) => state.app);

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
    }, [tabValue, navigate]);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        dispatch(appActions.setTabValue(newValue));
    };

    return (
        <AppBar component='div' position='relative' elevation={1} sx={{ width: '100%' }}>
            <Paper sx={{ color: 'primary.contrastText', bgcolor: 'primary.dark', borderRadius: 0.25 }}>
                <Tabs value={tabValue} onChange={handleChange} variant='fullWidth' centered sx={{
                    '& .MuiTabs-indicator': {
                        bgcolor: (theme) => theme.palette.mode === 'light'
                            ? theme.palette.common.white
                            : theme.custom.palette.main,
                    }
                }}>
                    <Tab label="All" {...a11yProps(0)} />
                    <Tab label="Services" {...a11yProps(1)} />
                    <Tab label="Statuses" {...a11yProps(2)} />
                    <Tab label="API" {...a11yProps(3)} />
                </Tabs>
            </Paper>
        </AppBar>
    );
};
