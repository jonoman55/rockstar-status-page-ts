import { forwardRef, useCallback, useMemo } from "react";
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";
import { Box, Menu, MenuItem as MuiMenuItem } from "@mui/material";

import { StatusAvatar } from "../styled/PaperCard.styled";
import { appActions } from "../../reducers/appSlice";
import { useAppDispatch } from "../../app/hooks";

import type { Children, StatusMenuItem } from "../../types";

interface StatusMenuProps {
    open: boolean;
    anchorEl: null | HTMLElement;
    handleClose: () => void;
    menuItems: StatusMenuItem[];
};

export const StatusMenu: React.FC<StatusMenuProps> = (props): JSX.Element => {
    const { open, anchorEl, handleClose, menuItems } = props;
    
    const dispatch = useAppDispatch();

    const handleClick = useCallback(
        (id: number) => () => {
            dispatch(appActions.setServicePageId(id));
            dispatch(appActions.setIsServiceRoute(true));
            dispatch(appActions.setTargetHref(`/service/${id}`));
        },
        [dispatch]
    );

    return (
        <Box component='div'>
            <Menu
                id='status-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                disableScrollLock
                MenuListProps={{
                    'aria-labelledby': 'status-button',
                }}
            >
                {menuItems.map((item: StatusMenuItem, idx: number) => (
                    <MenuItem
                        key={idx}
                        text={item.name}
                        to={`${item.to}`}
                        children={<StatusAvatar status={item.status} />}
                        onClick={handleClick(item.id as number)}
                    />
                ))}
            </Menu>
        </Box>
    );
};

interface MenuItemProps {
    children?: Children;
    text: string;
    to: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
};

export const MenuItem: React.FC<MenuItemProps> = (props): JSX.Element => {
    const { children, text, to, onClick } = props;

    const renderLink = useMemo(
        () =>
            forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'>>(function Link(
                itemProps,
                ref,
            ) {
                return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} onClick={onClick} />;
            }),
        [to, onClick]
    );

    return (
        <MuiMenuItem component={renderLink}>
            {children}&nbsp;&nbsp;{text}
        </MuiMenuItem>
    );
};
