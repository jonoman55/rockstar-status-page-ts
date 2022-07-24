import { Box, SxProps } from '@mui/material';

import { RockstarLogo } from '../../images';

interface Props {
    sx: SxProps;
}

export const RockstarIcon = ({ sx }: Props) => (
    <Box
        component='img'
        src={RockstarLogo}
        alt='rockstar-logo'
        sx={sx}
    />
);
