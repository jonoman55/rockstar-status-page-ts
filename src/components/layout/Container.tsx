import { Fragment } from 'react';
import { styled, useTheme, useMediaQuery, Box, BoxProps } from '@mui/material';

import { RockstarBackground } from '../../images';

import { ChildProps } from '../../types';

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
    body.style.backgroundColor = theme.palette.primary.dark;
    body.style.backgroundImage = `url(${RockstarBackground})`;
    body.style.backgroundSize = 'auto';
    body.style.backgroundRepeat = 'repeat';
    body.style.backgroundSize = '256px';
    return <Fragment>{props.children}</Fragment>;
};