import { useCallback, useEffect } from 'react';
import { Box } from '@mui/material';

import Sidebar from './Sidebar';
import { ToolTip } from '../controls';
import { ThemeSwitch, RockstarIcon } from '../design';
import { AppBar, Toolbar, LinkBox } from '../styled/Header.styled';
import { appActions } from '../../reducers/appSlice';
import { toggleTheme } from '../../reducers/themeSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { usePathname } from '../../hooks';

const Header: React.FC = (): JSX.Element => {
    const pathname = usePathname();
    const dispatch = useAppDispatch();

    const { darkTheme } = useAppSelector((state) => state.theme);
    
    const { targetHref, drawerOpen } = useAppSelector((state) => state.app);

    // Close Drawer if in open state on load
    const handleDrawerOpen = useCallback(() => { 
        if (pathname === targetHref) {
            console.log('closing drawer');
            if (drawerOpen) dispatch(appActions.setDrawerOpen(false));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, targetHref, dispatch]);

    useEffect(() => {
        handleDrawerOpen();
    }, [handleDrawerOpen]);

    const handleClick = useCallback(() => {
        dispatch(appActions.setTabValue(0));
        dispatch(appActions.setTargetHref('/all'));
        dispatch(appActions.setIsServiceRoute(false));
    }, [dispatch]);

    return (
        <AppBar position='static' elevation={2} pathname={pathname}>
            <Toolbar id='back-to-top-anchor' disableGutters>
                <Box sx={{ width: 78, height: 50 }}>
                    <Sidebar />
                </Box>
                <ToolTip title='Home' placement='bottom' component={
                    <LinkBox to='/all' onClick={handleClick}>
                        <RockstarIcon sx={{ height: 50, width: 50 }} />
                    </LinkBox>}
                />
                <Box sx={{ width: 78, height: 50 }}>
                    <ToolTip title={darkTheme ? 'Light Mode' : 'Dark Mode'} placement='bottom' component={
                        <ThemeSwitch
                            checked={darkTheme}
                            onChange={() => dispatch(toggleTheme())}
                        />}
                    />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
