import React, { forwardRef, useMemo } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { Box, ListItem, ListItemIcon, ListItemText } from '@mui/material';

const styles = {
    color: 'primary.contrastText',
};

interface ListItemLinkProps {
    icon?: React.ReactElement;
    primary: string;
    to: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
};

export const ListItemLink = (props: ListItemLinkProps): JSX.Element => {
    const { icon, primary, to, onClick } = props;

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
        <Box component='li'>
            <ListItem button component={renderLink}>
                {icon ? (
                    <ListItemIcon sx={styles}>{icon}</ListItemIcon>
                ) : null}
                <ListItemText primary={primary} sx={styles} />
            </ListItem>
        </Box>
    );
};
