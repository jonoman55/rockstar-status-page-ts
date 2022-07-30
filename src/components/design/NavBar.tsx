/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { Home as HomeIcon } from '@mui/icons-material';

import { AppBar, ButtonContainer, ToggleButtonGroup, ToggleButton, HomeButton } from '../styled/NavBar.styled';
import { usePathname } from '../../hooks/usePathname';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { appActions } from '../../reducers/appSlice';

import type { Service } from '../../types';

// TODO : Finish implementing this component
// DOCS : https://mui.com/material-ui/react-button-group/
export const NavBar: React.FC<{ services: Service[]; }> = ({ services }) => {
    const dispatch = useAppDispatch();
    const pathname = usePathname();

    // TODO : Figure out what this servicePageId is used for ???
    const { servicePageId, navbarAlignment } = useAppSelector((state) => state.app);

    const id = parseInt(pathname.slice(-1));

    const handleChange = (_event: React.MouseEvent<HTMLElement, MouseEvent>, newAlignment: string) => {
        dispatch(appActions.setNavbarAlignment(newAlignment));
    };

    return (
        <AppBar position='static'>
            <ButtonContainer>
                <ToggleButtonGroup value={navbarAlignment} exclusive fullWidth onChange={handleChange}>
                    <HomeButton LinkComponent={Link} to='/' value='Home'>
                        <HomeIcon />
                    </HomeButton>
                    {services?.map((service: Service) => (
                        <ToggleButton
                            key={service?.id}
                            selected={id === service?.id}
                            size='small' 
                            LinkComponent={Link} 
                            to={`/service/${service?.id}`}
                            value={service?.name} 
                            onClick={() => dispatch(appActions.setServicePageId(service?.id))}
                        >
                            {service?.name}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </ButtonContainer>
        </AppBar>
    );
};
