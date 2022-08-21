import { Theme } from '@mui/material';
import { Error, OfflinePin, OfflineBolt } from '@mui/icons-material';

import type { StatusType } from '../../types';

const styles = {
    borderRadius: (theme: Theme) => theme.shape.borderRadius,
    bgcolor: (theme: Theme) => theme.palette.mode === 'dark'
        ? theme.palette.action.disabled
        : theme.palette.action.disabledBackground,
};

interface Props {
    /**
     * Status Type
     */
    status: StatusType;
};

export const StatusIcon: React.FC<Props> = ({ status }): JSX.Element => {
    switch (status) {
        case 'up':
            return <OfflinePin fontSize='large' sx={{ ...styles, color: (theme) => theme.custom.palette.brightGreen }} />;
        case 'limited':
            return <OfflineBolt fontSize='large' sx={{ ...styles, color: (theme) => theme.custom.palette.brightYellow }} />;
        case 'down':
            return <Error fontSize='large' sx={{ ...styles, color: (theme) => theme.custom.palette.brightRed }} />;
        default:
            return <OfflinePin fontSize='large' sx={{ ...styles, color: (theme) => theme.custom.palette.brightGreen }} />;
    };
};
