import { Box, SxProps } from '@mui/material';

import { RockstarLogo } from '../../images';

export const RockstarIcon: React.FC<{ sx: SxProps; }> = ({ sx }): JSX.Element => (
    <Box
        component='img'
        src={RockstarLogo}
        alt='rockstar-logo'
        sx={sx}
    />
);
