/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useMemo } from 'react';
import { Container, Toolbar } from '@mui/material';

import { ButtonLink } from '../controls';
import { AppBar, Stack } from '../styled/LinkBar.styled';
import { appActions } from '../../reducers/appSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { usePathname } from '../../hooks';
import { LinkItems as links } from '../../constants';

import type { LinkItem } from '../../types';

export const LinkBar = (): JSX.Element => {
    const pathname = usePathname();
    const dispatch = useAppDispatch();

    const navLinks: LinkItem[] = useMemo(() => links.slice(0, 4), []);

    const { tabValue, targetHref } = useAppSelector((state) => state.app);

    const handleClick = useCallback((id: number, href: string) => () => {
        dispatch(appActions.setTabValue(id));
        dispatch(appActions.setTargetHref(href));
    }, [dispatch]);

    const selected: boolean = useMemo<boolean>(
        () => pathname === targetHref,
        [pathname, targetHref]
    );

    return (
        <AppBar position='static' elevation={2}>
            <Toolbar disableGutters>
                <Container disableGutters>
                    <Stack>
                        {navLinks.map(({ id, href, text }: LinkItem, index: number) => (
                            <ButtonLink
                                key={index}
                                text={text}
                                to={href}
                                selected={selected && tabValue === id}
                                onClick={handleClick(id, href)}
                            />
                        ))}
                    </Stack>
                </Container>
            </Toolbar>
        </AppBar>
    );
};
