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

import type { StatusType } from '../types';

export const StyleStatus = (theme: Theme, status: StatusType) => {
    switch (status) {
        case 'up':
            return theme.custom.palette.brightGreen;
        case 'limited':
            return theme.custom.palette.brightYellow;
        case 'down':
            return theme.custom.palette.brightRed;
        default:
            return theme.palette.common.black;
    };
};

export const FetchStatus = (status: StatusType) => {
    switch (status) {
        case 'up':
            return 'UP';
        case 'limited':
            return 'LIMITED';
        case 'down':
            return 'DOWN';
        default:
            return status;
    };
};

export const FetchImage = (id: number) => {
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
export const CheckStatuses = (statuses: any[]) => {
    if (Object.values(statuses).every((s) => s?.status.toLowerCase() === 'up'))
        return RockstarStatus.up;
    if (statuses.map((s) => s?.status.toLowerCase() === 'limited'))
        return RockstarStatus.limited;
    if (statuses.map((s) => s?.status.toLowerCase() === 'down'))
        return RockstarStatus.down;
};

/**
 * Get The Hightest Rockstar Status Count
 * @param statuses RockstarStatus
 * @returns The greatest status count
 */
export const GetStatusesCount = (statuses: RockstarStatus[]) => {
    return lodash.head(lodash(statuses)
        .countBy()
        .entries()
        .maxBy(lodash.last)
    );
};

interface Indicator {
    key: number;
    value: string;
};

export const FetchStatusByCount = (statuses: any[]) => {
    const count = lodash.countBy(statuses, 'status');
    let indicator: Indicator = { key: 0, value: '' };
    for (const [value, key] of Object.entries(count)) {
        indicator = { key, value };
    }
    return indicator?.value?.toLowerCase();
};