import { Link } from 'react-router-dom';
import { styled, AppBar as MuiAppBar, Toolbar as MuiToolbar, Box, AppBarProps, BoxProps, ToolbarProps } from '@mui/material';

interface AppBarExtProps {
    pathname: string;
};

export const AppBar = styled(({ ...prop }: AppBarProps & AppBarExtProps) =>
    <MuiAppBar component='header' {...prop} />, {
    shouldForwardProp: (prop: PropertyKey) => prop !== 'pathname'
})(({ theme, pathname }) => ({
    backgroundColor: theme.custom.palette.main,
    ...(pathname !== '/outages' && {
        borderBottom: `2px solid ${theme.palette.primary.contrastText}`,
    }),
    ...(pathname === '/outages' && {
        borderBottom: `2px solid ${theme.palette.common.white}`,
    }),
}));

export const Toolbar = styled(({ ...props }: ToolbarProps) =>
    <MuiToolbar component='div' {...props} />
)(({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 85,
}));

export const LinkBox = styled(({ ...props }: BoxProps) =>
    <Box component={Link} {...props} />
)(({
    width: 'auto',
    height: 'auto',
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
})) as unknown as typeof Link;

export const titleStyles = {
    mx: 2,
    '&:hover': {
        color: 'secondary.contrastText'
    },
};
