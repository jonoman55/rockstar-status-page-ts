import { Fragment } from 'react';
import { styled, useTheme, useMediaQuery, Box, BoxProps } from '@mui/material';

import { ChildProps } from '../../types';

// TODO : Fix minHeight after main content is populated
export const FlexContainer = styled(({ ...props }: BoxProps) => (
    <Box {...props} component='main' />
))(({ theme }) => ({
    width: '100%',
    height: '100%',
    minHeight: useMediaQuery(theme.breakpoints.up('sm'))
        ? '83.9vh'
        : '100%', // 85.6vh'
    backgroundColor: theme.palette.primary.main,
}));

export const Container = styled(Box)(({
    width: '100%',
    height: '100%',
}));

interface Props {
    children: ChildProps;
}

export const Body: React.FC<Props> = (props) => {
    const theme = useTheme();
    const body = document.querySelector('body') as HTMLBodyElement;
    body.style.backgroundColor = theme.palette.background.paper;
    return <Fragment>{props.children}</Fragment>;
};