import { useEffect, useMemo } from 'react';
import { Box } from '@mui/material';

import Sidebar from './Sidebar';
import { XLFlexText, ToolTip } from '../controls';
import { ThemeSwitch, RockstarIcon } from '../design';
import { AppBar, Toolbar, LinkBox, titleStyles } from '../styled/Header.styled';
import { appActions } from '../../reducers/appSlice';
import { toggleTheme } from '../../reducers/themeSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { usePathname } from '../../hooks';

const Header: React.FC = () => {
    const pathname = usePathname();
    const dispatch = useAppDispatch();

    const { darkTheme } = useAppSelector((state) => state.theme);
    const { servicePageId } = useAppSelector((state) => state.app);

    const pageId = useMemo(() => parseInt(pathname.slice(-1)), [pathname]);

    useEffect(() => {
        if (servicePageId !== pageId) {
            dispatch(appActions.setServicePageId(pageId));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return (
        <AppBar position='static' elevation={2}>
            <Toolbar id='back-to-top-anchor' disableGutters>
                <Box sx={{ width: 'auto', height: 'auto' }}>
                    <Sidebar />
                </Box>
                <ToolTip title='Home' placement='bottom' component={
                    <LinkBox to='/all' onClick={() => dispatch(appActions.setTabValue(0))}>
                        <RockstarIcon sx={{ height: 50, width: 50, my: 0.5, ml: 1 }} />
                        <XLFlexText fontWeight={600} textAlign='center' sx={titleStyles}>
                            Rockstar Status Page
                        </XLFlexText>
                    </LinkBox>}
                />
                <Box sx={{ width: 'auto', height: 'auto' }}>
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
