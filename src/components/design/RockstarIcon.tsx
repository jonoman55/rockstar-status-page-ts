import { Box, SxProps } from '@mui/material';

import logo from '../../images/svgs/logo.svg';

interface Props {
    sx: SxProps;
}

export const RockstarIcon = ({ sx }: Props) => (
    <Box
        component='img'
        src={logo}
        alt='rockstar-logo'
        sx={sx}
    />
);
