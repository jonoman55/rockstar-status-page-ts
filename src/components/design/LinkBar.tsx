import { useCallback, useMemo } from 'react';
import { Container, Toolbar } from '@mui/material';

import { ButtonLink } from '../controls';
import { AppBar, Stack } from '../styled/LinkBar.styled';
import { appActions } from '../../reducers/appSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { usePathname } from '../../hooks';
import { LinkItems } from '../../constants';

import type { LinkItem } from '../../types';

export const LinkBar = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const pathname = usePathname();

    const links: LinkItem[] = useMemo(() => LinkItems.slice(0, 4), []);

    const { tabValue, targetHref } = useAppSelector((state) => state.app);
    
    const selected: boolean = useMemo<boolean>(
        () => pathname === targetHref,
        [pathname, targetHref]
    );

    const handleClick = useCallback(
        (id: number, to: string) => () => {
            dispatch(appActions.setTabValue(id));
            dispatch(appActions.setTargetHref(to));
            dispatch(appActions.setIsServiceRoute(false));
            dispatch(appActions.setServicePageId(0));
            dispatch(appActions.setDrawerOpen(false));
        },
        [dispatch]
    );

    return (
        <AppBar position='static' elevation={2}>
            <Toolbar disableGutters>
                <Container disableGutters>
                    <Stack>
                        {links.map(({ id, to, text }: LinkItem, index: number) => (
                            <ButtonLink
                                key={index}
                                text={text}
                                to={to!}
                                selected={selected && tabValue === id}
                                onClick={handleClick(id, to!)}
                            />
                        ))}
                    </Stack>
                </Container>
            </Toolbar>
        </AppBar>
    );
};
