import { Link } from 'react-router-dom';
import { styled, AppBar as MuiAppBar, Toolbar as MuiToolbar, Box, AppBarProps, BoxProps, ToolbarProps } from '@mui/material';

export const AppBar = styled(({ ...prop }: AppBarProps) =>
    <MuiAppBar component='header' {...prop} />
)(({ theme }) => ({
    backgroundColor: theme.custom.palette.main,
    borderBottom: `solid 2px ${theme.palette.primary.contrastText}`,
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
    <Box component={Link} {...props } />
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
