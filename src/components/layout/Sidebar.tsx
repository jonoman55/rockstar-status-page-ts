import { useCallback, useMemo, Fragment } from 'react';
import { BadgeOrigin, Box, ClickAwayListener, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { DarkMode, LightMode, Menu as MenuIcon } from '@mui/icons-material';

import { ListItemLinkButton, ListItemLink, ToolTip } from '../controls';
import { Badge, ListSubheader, IconButton, Switch } from '../styled/Sidebar.styled';
import { appActions } from '../../reducers/appSlice';
import { toggleTheme } from '../../reducers/themeSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useBreakpoints } from '../../hooks';
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

const badgeAnchorOrigin: BadgeOrigin = {
    vertical: 'top',
    horizontal: 'right',
};

const SidebarList: React.FC<ListProps> = ({ anchor, toggleDrawer }): JSX.Element => {
    const dispatch = useAppDispatch();
    const matches: boolean = useBreakpoints('sm', 'up');

    const outageCount: number = useAppSelector((state) => state.app.outageCount);

    const darkMode: boolean = useAppSelector((state) => state.theme.darkMode);

    const placement: Placement = useMemo<Placement>(
        () => matches ? 'right' : 'top-end',
        [matches]
    );

    const internalLinks: LinkItem[] = useMemo<LinkItem[]>(() =>
        LinkItems.filter((i) => i.type !== 'external' && i.type !== 'other'),
        []
    );

    const externalLinks: LinkItem[] = useMemo<LinkItem[]>(() =>
        LinkItems.filter((i) => i.type === 'external'),
        []
    );

    return (
        <Box
            sx={{ width: anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List component='nav' subheader={<ListSubheader>Status Pages</ListSubheader>}>
                {internalLinks.map(({ text, icon, to, id }: LinkItem) =>
                    text === 'Outages' ? (
                        <ListItemLink
                            key={id}
                            primary={text}
                            to={`${to}`}
                            icon={<Badge badgeContent={outageCount} anchorOrigin={badgeAnchorOrigin}>{icon}</Badge>}
                            placement={placement}
                        />
                    ) : (
                        <ListItemLink
                            key={id}
                            primary={text}
                            to={`${to}`}
                            icon={icon}
                            placement={placement}
                        />
                    )
                )}
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
                        {darkMode ? <DarkMode /> : <LightMode />}
                    </ListItemIcon>
                    <ListItemText
                        id="switch-list-label-theme"
                        primary={darkMode ? 'Dark Mode' : 'Light Mode'}
                        sx={{ color: 'primary.contrastText' }}
                    />
                    <ToolTip title={`Toggle ${darkMode ? 'Light Mode' : 'Dark Mode'}`} placement={matches ? 'right' : 'top'} component={
                        <Switch
                            edge="end"
                            onChange={() => dispatch(toggleTheme())}
                            checked={darkMode}
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
    const matches: boolean = useBreakpoints('sm', 'up');

    const drawerOpen: boolean = useAppSelector((state) => state.app.drawerOpen);

    const outageCount: number = useAppSelector((state) => state.app.outageCount);

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
                        <Badge badgeContent={outageCount}>
                            <MenuIcon fontSize='medium' />
                        </Badge>
                    </IconButton>
                    <ClickAwayListener onClickAway={() => toggleDrawer(false)}>
                        <Drawer
                            variant='temporary'
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
