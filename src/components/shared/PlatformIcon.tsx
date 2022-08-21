import { useTheme, Box, Icon } from '@mui/material';
import {
    Store,
    NotificationsActive as Alert,
    Security as Authentication,
    Download as Downloads,
    FactCheck as AllFeatures
} from '@mui/icons-material';
import {
    FaXbox as Xbox,
    FaDesktop as PC,
    FaPlaystation as Playstation
} from 'react-icons/fa';
import {
    SiStadia as Stadia,
    // SiPlaystation4 as PS4,
    // SiPlaystation3 as PS3,
    // SiPlaystation5 as PS5,
    SiXbox as Xbox360
} from 'react-icons/si';
import {
    AiOutlineCloudServer as CloudServices
} from 'react-icons/ai';

import { PlatformType } from '../../constants/PlatformType';
import { RockstarWhiteLogo } from '../../images';

interface Props {
    platform: string;
};

export const PlatformIcon: React.FC<Props> = ({ platform }): JSX.Element => {
    const theme = useTheme();
    switch (platform) {
        case PlatformType.PC:
            return (
                <Icon
                    component={PC}
                    sx={{ color: theme.custom.palette.pc, width: 'auto' }}
                />
            );
        case PlatformType.XboxOne:
            return (
                <Icon
                    component={Xbox}
                    sx={{ color: theme.custom.palette.xboxOne, width: 'auto' }}
                />
            );
        case PlatformType.Xbox360:
            return (
                <Icon
                    component={Xbox360}
                    sx={{ color: theme.custom.palette.xbox360, width: 'auto' }}
                />
            );
        case PlatformType.XboxCloudGaming:
            return (
                <Icon
                    component={Xbox}
                    sx={{ color: theme.custom.palette.xboxCloud, width: 'auto' }}
                />
            );
        case PlatformType.XboxSeriesXS:
            return (
                <Icon
                    component={Xbox}
                    sx={{ color: theme.custom.palette.green, width: 'auto' }}
                />
            )
        case PlatformType.PS3:
            return (
                <Icon
                    component={Playstation}
                    sx={{ color: theme.custom.palette.playstation, width: 'auto' }}
                />
            );
        case PlatformType.PS4:
            return (
                <Icon
                    component={Playstation}
                    sx={{ color: theme.custom.palette.playstation, width: 'auto' }}
                />
            );
        case PlatformType.PS5:
            return (
                <Icon
                    component={Playstation}
                    sx={{ color: theme.custom.palette.playstation, width: 'auto' }}
                />
            )
        case PlatformType.Stadia:
            return (
                <Icon
                    component={Stadia}
                    sx={{ color: theme.custom.palette.stadia, width: 'auto' }}
                />
            );
        case PlatformType.Alert:
            return (
                <Icon
                    component={Alert}
                    sx={{ color: theme.custom.palette.alert, width: 'auto' }}
                />
            );
        case PlatformType.Authentication:
            return (
                <Icon
                    component={Authentication}
                    sx={{ color: theme.custom.palette.auth, width: 'auto' }}
                />
            );
        case PlatformType.Store:
            return (
                <Icon
                    component={Store}
                    sx={{ color: theme.custom.palette.store, width: 'auto' }}
                />
            );
        case PlatformType.CloudServices:
            return (
                <Icon
                    component={CloudServices}
                    sx={{ color: theme.custom.palette.cloud, width: 'auto' }}
                />
            );
        case PlatformType.Downloads:
            return (
                <Icon
                    component={Downloads}
                    sx={{ color: theme.custom.palette.downloads, width: 'auto' }}
                />
            );
        case PlatformType.AllFeatures:
            return (
                <Icon
                    component={AllFeatures}
                    sx={{ color: theme.custom.palette.all, width: 'auto' }}
                />
            );
        default:
            return (
                <Box
                    component='img'
                    src={RockstarWhiteLogo}
                    alt='defualt'
                    sx={{ color: 'primary.contrastText', width: '24px', height: '24px' }}
                />
            );
    };
};