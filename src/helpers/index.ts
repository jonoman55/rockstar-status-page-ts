import { Theme } from '@mui/material';
import lodash from 'lodash';

import {
    GrandTheftAutoOnline,
    RedDeadOnline,
    RockstarGamesLauncher,
    SocialClub,
    RockstarSupport,
    RockstarWhiteLogo,
    RockstarLogo
} from '../images'
import { RockstarStatus } from '../constants';

import type { Indicator, StatusType } from '../types';

export const styleStatus = (theme: Theme, status: StatusType | string) => {
    switch (status?.toLowerCase()) {
        case RockstarStatus.UP:
            return theme.custom.palette.brightGreen;
        case RockstarStatus.LIMITED:
            return theme.custom.palette.brightYellow;
        case RockstarStatus.DOWN:
            return theme.custom.palette.brightRed;
        default:
            return theme.palette.common.black;
    };
};

export const fetchStatus = (status: StatusType) => {
    switch (status?.toLowerCase()) {
        case RockstarStatus.UP:
            return 'UP';
        case RockstarStatus.LIMITED:
            return 'LIMITED';
        case RockstarStatus.DOWN:
            return 'DOWN';
        default:
            return status;
    };
};

export const fetchImage = (id: number) => {
    switch (id) {
        case 1:
            return RockstarWhiteLogo;
        case 2:
            return RedDeadOnline;
        case 3:
            return GrandTheftAutoOnline;
        case 4:
            return SocialClub;
        case 5:
            return RockstarSupport;
        case 6:
            return RockstarGamesLauncher;
        default:
            return RockstarLogo;
    };
};

// TODO : Remove this after testing is done with getStatusesCount
export const checkStatuses = (statuses: any[]) => {
    if (Object.values(statuses).every((s) => s?.status.toLowerCase() === 'up'))
        return RockstarStatus.UP;
    if (statuses.map((s) => s?.status.toLowerCase() === 'limited'))
        return RockstarStatus.LIMITED;
    if (statuses.map((s) => s?.status.toLowerCase() === 'down'))
        return RockstarStatus.DOWN;
};

/**
 * Get The Hightest Rockstar Status Count
 * @param statuses RockstarStatus
 * @returns The greatest status count
 */
export const getStatusesCount = (statuses: RockstarStatus[]) => {
    return lodash.head(lodash(statuses)
        .countBy()
        .entries()
        .maxBy(lodash.last)
    );
}; 

export const fetchStatusByCount = (statuses: any[]) => {
    const count = lodash.countBy(statuses, 'status');
    let indicator: Indicator = { key: 0, value: '' };
    for (const [value, key] of Object.entries(count)) {
        indicator = { key, value };
    }
    return indicator?.value?.toLowerCase();
};