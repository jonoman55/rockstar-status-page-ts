import { Error, OfflinePin, OfflineBolt } from '@mui/icons-material';

import type { StatusType } from '../../types';

interface Props {
    status: StatusType;
}

export const StatusIcon = ({ status }: Props) => {
    switch (status) {
        case 'up':
            return <OfflinePin fontSize='large' sx={{ color: (theme) => theme.custom.palette.brightGreen }} />;
        case 'limited':
            return <OfflineBolt fontSize='large' sx={{ color: (theme) => theme.custom.palette.brightYellow }} />;
        case 'down':
            return <Error fontSize='large' sx={{ color: (theme) => theme.custom.palette.brightRed }} />;
        default:
            return <OfflinePin fontSize='large' sx={{ color: (theme) => theme.custom.palette.brightGreen }} />;
    };
};
