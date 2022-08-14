import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import Sidebar from './Sidebar';
import { ToolTip } from '../controls';
import { ThemeSwitch, RockstarIcon } from '../design';
import { AppBar, Toolbar, LinkBox } from '../styled/Header.styled';
import { appActions } from '../../reducers/appSlice';
import { toggleTheme } from '../../reducers/themeSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { usePathname } from '../../hooks';

const Header: React.FC = () => {
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { darkTheme } = useAppSelector((state) => state.theme);
    const { servicePageId, targetHref } = useAppSelector((state) => state.app);

    const pageId = useMemo(() => parseInt(pathname.slice(-1)), [pathname]);

    useEffect(() => {
        if (servicePageId !== pageId) {
            dispatch(appActions.setServicePageId(pageId));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    useEffect(() => {
        if (targetHref !== pathname && !pathname.includes('/service/')) {
            navigate(targetHref);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, targetHref]);

    const handleClick = () => {
        dispatch(appActions.setTabValue(0));
        dispatch(appActions.setTargetHref('/all'));
    };

    return (
        <AppBar position='static' elevation={2}>
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
