import { useCallback, useMemo, Fragment } from 'react';
import { Box, ClickAwayListener, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { DarkMode, LightMode, Menu as MenuIcon } from '@mui/icons-material';

import { ListItemLinkButton, ListItemLink, ToolTip } from '../controls';
import { ListSubheader, IconButton, Switch } from '../styled/Sidebar.styled';
import { appActions } from '../../reducers/appSlice';
import { toggleTheme } from '../../reducers/themeSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useBreakpoint } from '../../hooks';
import { LinkItems } from '../../constants';

import type { LinkItem, Anchor, Placement } from '../../types';

/**
 * Sidebar List Props
 */
interface ListProps {
    /**
     * Drawer Anchor
     */
    anchor: Anchor;
    /**
     * Toggle Drawer Function
     */
    toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
};

const SidebarList: React.FC<ListProps> = ({ anchor, toggleDrawer }): JSX.Element => {
    const dispatch = useAppDispatch();
    const matches: boolean = useBreakpoint('sm', 'up');

    const internalLinks: LinkItem[] = useMemo(() =>
        LinkItems.filter((i) => i.type !== 'external' && i.type !== 'other'),
        []
    );

    const externalLinks: LinkItem[] = useMemo(() =>
        LinkItems.filter((i) => i.type === 'external'),
        []
    );

    const darkTheme: boolean = useAppSelector((state) => state.theme.darkTheme);

    const placement: Placement = useMemo(() => matches ? 'right' : 'top-end', [matches]);

    return (
        <Box
            sx={{ width: anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List component='nav' subheader={<ListSubheader>Status Pages</ListSubheader>}>
                {internalLinks.map(({ text, icon, to, id }: LinkItem) => (
                    <ListItemLink
                        key={id}
                        primary={text}
                        to={`${to}`}
                        icon={icon}
                        placement={placement}
                    />
                ))}
            </List>
            <List subheader={<ListSubheader>External Links</ListSubheader>}>
                {externalLinks.map(({ text, icon, href, id }: LinkItem) => (
                    <ListItemLinkButton
                        key={id}
                        primary={text}
                        href={`${href}`}
                        icon={icon}
                        placement={placement}
                    />
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
                            inputProps={{ 'aria-labelledby': 'switch-list-label-theme' }}
                        />}
                    />
                </ListItem>
            </List>
            <Divider />
        </Box>
    );
};

const Sidebar: React.FC = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const matches: boolean = useBreakpoint('sm', 'up');

    const drawerOpen: boolean = useAppSelector((state) => state.app.drawerOpen);

    const toggleDrawer = useCallback(
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (event && event.type === 'keydown'
                    && ((event as React.KeyboardEvent).key === 'Tab'
                        || (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }
                dispatch(appActions.setDrawerOpen(open));
            },
        [dispatch]
    );

    return (
        <Box component='div'>
            {([matches ? 'left' : 'bottom'] as const).map((anchor: Anchor) => (
                <Fragment key={anchor}>
                    <IconButton size='large' onClick={toggleDrawer(true)}>
                        <MenuIcon fontSize='medium' />
                    </IconButton>
                    <ClickAwayListener onClickAway={() => toggleDrawer(false)}>
                        <Drawer
                            variant="temporary"
                            anchor={anchor}
                            open={drawerOpen}
                            onClose={toggleDrawer(false)}
                        >
                            <SidebarList
                                anchor={anchor}
                                toggleDrawer={toggleDrawer}
                            />
                        </Drawer>
                    </ClickAwayListener>
                </Fragment>
            ))}
        </Box>
    );
};

export default Sidebar;
