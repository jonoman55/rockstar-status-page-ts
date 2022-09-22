import React from 'react';
import { styled, useScrollTrigger, Zoom, Box, Fab } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';

import { ChildProps } from '../../interfaces';
import type { Children, ZoomStyles } from '../../types';

/**
 * Default Zoom Styles
 */
const zoomBoxStyles: ZoomStyles = {
    position: 'fixed',
    bottom: 100,
    right: 25,
};

/**
 * Scroll To Top Icon
 */
const UpIcon = styled(Fab)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.custom.palette.main,
}));

/**
 * Scroll Top Props
 */
interface ScrollTopProps {
    children: Children;
    window?: () => Window;
};

/**
 * Scroll Top Wrapper Component
 * @param {ScrollTopProps} props 
 * @returns {JSX.Element} JSX Element
 */
const ScrollTop = (props: ScrollTopProps): JSX.Element => {
    const { children, window } = props;

    /**
     * Scroll Trigger Options
     */
    const trigger: boolean = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });
  
    const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
        const anchor = (
            (event.target as HTMLDivElement).ownerDocument || document
        ).querySelector('#back-to-top-anchor');
        if (anchor) {
            anchor.scrollIntoView({
                block: 'center',
                behavior: 'smooth'
            });
        }
    };
    
    return (
        <Zoom in={trigger}>
            <Box role='presentation' onClick={handleClick} sx={zoomBoxStyles}>
                {children}
            </Box>
        </Zoom>
    );
};

/**
 * Scroll Back To Top Button
 * @param {ChildProps} props React Node
 * @returns {JSX.Element} JSX Element
 */
const BackToTop = (props: ChildProps): JSX.Element => (
    <ScrollTop {...props}>
        <UpIcon color='primary' size='small' aria-label='scroll back to top'>
            <KeyboardArrowUp />
        </UpIcon>
    </ScrollTop>
);

export default BackToTop;
