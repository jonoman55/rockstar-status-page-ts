import { Fragment } from 'react';
import { Box, SwipeableDrawer, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { DarkMode, LightMode, Menu as MenuIcon } from '@mui/icons-material';

import { ToolTip } from '../controls';
import { ListSubheader, IconButton, Switch } from '../styled/Sidebar.styled';
import { appActions } from '../../reducers/appSlice';
import { toggleTheme } from '../../reducers/themeSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useBreakpoint } from '../../hooks';
import { LinkItems } from '../../constants';

import type { LinkItem, Anchor } from '../../types';

interface SidebarListProps {
    anchor: Anchor;
    toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void
};

const SidebarList = ({ anchor, toggleDrawer }: SidebarListProps) => {
    const dispatch = useAppDispatch();
    const matches = useBreakpoint('sm', 'up');

    const { darkTheme } = useAppSelector((state) => state.theme);
    
    return (
        <Box
            sx={{ width: anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List component='nav' subheader={<ListSubheader>Status Pages</ListSubheader>}>
                {LinkItems.filter((i) => i.type !== 'external' && i.type !== 'other').map(({ text, icon, id }: LinkItem, index: number) => (
                    <ListItem key={index} disablePadding>
                        <ToolTip title={text} placement={matches ? 'right' : 'top-end'} sx={{ width: '100%' }} component={
                            <ListItemButton onClick={() => dispatch(appActions.setTabValue(id))}>
                                <ListItemIcon sx={{ color: 'primary.contrastText' }}>
                                    {icon}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ color: 'primary.contrastText' }} />
                            </ListItemButton>}
                        />
                    </ListItem>
                ))}
            </List>
            <List subheader={<ListSubheader>External Links</ListSubheader>}>
                {LinkItems.filter((i) => i.type === 'external').map(({ text, icon, href }: LinkItem, index: number) => (
                    <ListItem key={index} disablePadding>
                        <ToolTip title={text} placement={matches ? 'right' : 'top-end'} sx={{ width: '100%' }} component={
                            <ListItemButton href={`${href}`} target='_blank'>
                                <ListItemIcon sx={{ color: 'primary.contrastText' }}>
                                    {icon}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ color: 'primary.contrastText' }} />
                            </ListItemButton>}
                        />
                    </ListItem>
                ))}
            </List>
            <List subheader={<ListSubheader>Settings</ListSubheader>}>
                <ListItem>
                    <ListItemIcon sx={{ color: 'primary.contrastText' }}>
                        {darkTheme ? <DarkMode /> : <LightMode />}
                    </ListItemIcon>
                    <ListItemText
                        id="switch-list-label-theme"
                        primary={darkTheme ? 'Dark Mode' : 'Light Mode'}
                        sx={{ color: 'primary.contrastText' }}
                    />
                    <ToolTip title={`Toggle ${darkTheme ? 'Light Mode' : 'Dark Mode'}`} placement={matches ? 'right' : 'top'} component={
                        <Switch
                            edge="end"
                            onChange={() => dispatch(toggleTheme())}
                            checked={darkTheme}
                            inputProps={{
                                'aria-labelledby': 'switch-list-label-theme',
                            }}
                        />} />
                </ListItem>
            </List>
            <Divider />
        </Box>
    );
};

const Sidebar = () => {
    const dispatch = useAppDispatch();
    const matches = useBreakpoint('sm', 'up');

    const { drawerOpen } = useAppSelector((state) => state.app);

    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (event && event.type === 'keydown'
                    && ((event as React.KeyboardEvent).key === 'Tab'
                        || (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }
                dispatch(appActions.setDrawerAnchor(open));
            };

    return (
        <Box component='div'>
            {([matches ? 'left' : 'bottom'] as const).map((anchor: Anchor) => (
                <Fragment key={anchor}>
                    <IconButton size='large' onClick={toggleDrawer(true)}>
                        <MenuIcon fontSize='medium' />
                    </IconButton>
                    <SwipeableDrawer
                        anchor={anchor}
                        open={drawerOpen}
                        onClose={toggleDrawer(false)}
                        onOpen={toggleDrawer(true)}
                    >
                        <SidebarList
                            anchor={anchor}
                            toggleDrawer={toggleDrawer}
                        />
                    </SwipeableDrawer>
                </Fragment>
            ))}
        </Box>
    );
};

export default Sidebar;
