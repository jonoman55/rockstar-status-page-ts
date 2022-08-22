import { Fragment } from 'react';
import { styled, useTheme, useMediaQuery, Box, BoxProps } from '@mui/material';

import { RockstarBackground } from '../../images';

import { ChildProps } from '../../interfaces';

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

export const Container = styled(Box)<BoxProps>(({
    width: '100%',
    height: '100%',
}));

export const Body: React.FC<ChildProps> = (props): JSX.Element => {
    const theme = useTheme();
    const body = document.querySelector('body') as HTMLBodyElement;
    body.style.backgroundColor = theme.palette.primary.dark;
    body.style.backgroundImage = `url(${RockstarBackground})`;
    body.style.backgroundSize = 'auto';
    body.style.backgroundRepeat = 'repeat';
    body.style.backgroundSize = '256px';
    return <Fragment>{props.children}</Fragment>;
};