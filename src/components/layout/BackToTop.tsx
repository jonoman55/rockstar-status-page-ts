import React from 'react';
import { styled, useScrollTrigger, Zoom, Box, Fab } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';

import type { ChildProps, ZoomStyles } from '../../types';

const zoomBoxStyles: ZoomStyles = {
    position: 'fixed',
    bottom: 100,
    right: 15,
};

const UpIcon = styled(Fab)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.custom.palette.main,
}));

interface ScrollTopProps {
    children: ChildProps;
    window?: () => Window;
};

function ScrollTop(props: ScrollTopProps): JSX.Element {
    const { children, window } = props;

    const trigger: boolean = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });
  
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
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

interface Props {
    children: ChildProps;
};

const BackToTop: React.FC<Props> = (props) => (
    <ScrollTop {...props}>
        <UpIcon color='primary' size='small' aria-label='scroll back to top'>
            <KeyboardArrowUp />
        </UpIcon>
    </ScrollTop>
);

export default BackToTop;
