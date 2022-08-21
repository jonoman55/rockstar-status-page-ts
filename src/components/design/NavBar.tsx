import { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { Home as HomeIcon } from '@mui/icons-material';

import { AppBar, ButtonContainer, ToggleButtonGroup, ToggleButton, HomeButton } from '../styled/NavBar.styled';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { appActions } from '../../reducers/appSlice';

import type { Service } from '../../types';

export const NavBar: React.FC<{ services: Service[]; }> = ({ services }) => {
    const dispatch = useAppDispatch();

    const { servicePageId, navbarAlignment } = useAppSelector((state) => state.app);

    const setSelected = useCallback(({ id }: Service) => {
        dispatch(appActions.setServicePageId(id));
        dispatch(appActions.setIsServiceRoute(true));
        dispatch(appActions.setTargetHref(`/service/${id}`));
    }, [dispatch]);

    const handleChange = (_event: React.MouseEvent<HTMLElement, MouseEvent>, newAlignment: string) => {
        dispatch(appActions.setNavbarAlignment(newAlignment));
    };

    const handleClick = () => {
        dispatch(appActions.setTabValue(0));
        dispatch(appActions.setTargetHref('/all'));
        dispatch(appActions.setIsServiceRoute(false));
    };

    return (
        <AppBar position='static'>
            <ButtonContainer>
                <ToggleButtonGroup value={navbarAlignment} exclusive fullWidth onChange={handleChange}>
                    <HomeButton LinkComponent={NavLink} to='/all' value='Home' onClick={handleClick}>
                        <HomeIcon />
                    </HomeButton>
                    {services?.map((service: Service, index: number) => (
                        <ToggleButton
                            key={index}
                            selected={servicePageId === service?.id}
                            size='small' 
                            LinkComponent={NavLink} 
                            to={`/service/${service?.id}`}
                            value={service?.name} 
                            onClick={() => setSelected(service)}
                        >
                            {service?.name}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </ButtonContainer>
        </AppBar>
    );
};
