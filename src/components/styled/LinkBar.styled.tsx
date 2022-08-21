import { styled, AppBar as MuiAppBar, AppBarProps as MuiAppBarProps, Stack as MuiStack, StackProps as MuiStackProps } from '@mui/material';

export const AppBar = styled(({ ...props }: MuiAppBarProps) =>
    <MuiAppBar component='div' {...props} />
)<MuiAppBarProps>(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark'
        ? theme.palette.background.paper
        : theme.palette.primary.dark,
    borderBottom: 0,
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
}));

export const Stack = styled(({ ...props }: MuiStackProps) =>
    <MuiStack direction='row' spacing={2} {...props} />
)(({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
}));
