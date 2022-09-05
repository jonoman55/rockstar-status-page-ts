import { Theme, useTheme, CSSObject } from '@mui/material/styles';
import { Error, OfflinePin, OfflineBolt } from '@mui/icons-material';

import type { StatusType } from '../../types';

/**
 * Create Icon Styles
 * @param {Theme} theme MUI Theme
 * @param {string} status Rockstar Status
 * @returns {CSSObject} CSS Styles Object
 */
const iconStyles = (theme: Theme, status: string): CSSObject => {
    return {
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.mode === 'dark'
            ? theme.palette.action.disabled
            : theme.palette.action.disabledBackground,
        ...(status === 'up' && {
            color: theme.custom.palette.brightGreen,
        }),
        ...(status === 'limited' && {
            color: theme.custom.palette.brightYellow,
        }),
        ...(status === 'down' && {
            color: theme.custom.palette.brightRed,
        }),
        ...(!status && {
            color: theme.custom.palette.brightGreen,
        }),
    };
};

/**
 * Status Icon Props
 */
interface StatusIconProps {
    /**
     * Status Type
     */
    status: StatusType;
};

/**
 * Rockstar Status Icon
 */
export const StatusIcon: React.FC<StatusIconProps> = ({ status }): JSX.Element => {
    const theme: Theme = useTheme();
    const iconStatus: string = status as string;
    switch (status) {
        case 'up':
            return <OfflinePin fontSize='large' sx={{ ...iconStyles(theme, iconStatus) }} />;
        case 'limited':
            return <OfflineBolt fontSize='large' sx={{ ...iconStyles(theme, iconStatus) }} />;
        case 'down':
            return <Error fontSize='large' sx={{ ...iconStyles(theme, iconStatus) }} />;
        default:
            return <OfflinePin fontSize='large' sx={{ ...iconStyles(theme, iconStatus) }} />;
    };
};
