import { Theme } from '@mui/material';
import lodash from 'lodash';

import {
    GrandTheftAutoOnline,
    RedDeadOnline,
    RockstarGamesLauncher,
    SocialClub,
    RockstarSupport,
    RockstarWhiteLogo,
    RockstarLogo,
    EagleLogo,
    StatusApiLogo,
    ServicesLogo,
    StatusesLogo,
    RockstarGames,
    RockstarIndia,
    RockstarLeeds,
    RockstarLondon,
    RockstarLincoln,
    RockstarNewEngland,
    RockstarNorth,
    RockstarSanDiego,
    RockstarToronto,
    RockstarVancouver,
    RockstarVienna,
    WhiteLogo
} from '../images'
import { RockstarStatus } from '../constants';

import type { Indicator, StatusType } from '../types';

/**
 * Style Status
 * @param {Theme} theme MUI Theme
 * @param {StatusType | string} status Status Type
 * @returns {string} Corresponding Color of Status Type
 */
export const styleStatus = (theme: Theme, status: StatusType | string): string => {
    switch (status?.toLowerCase()) {
        case RockstarStatus.UP:
            return theme.custom.palette.brightGreen;
        case RockstarStatus.LIMITED:
            return theme.custom.palette.orange; // brightYellow
        case RockstarStatus.DOWN:
            return theme.custom.palette.brightRed;
        default:
            return theme.palette.common.black;
    };
};

/**
 * Fetch Rockstar Image
 * @param {number} id Service ID
 * @returns {string} Corresponding Logo
 */
export const fetchImage = (id: number): string => {
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

/**
 * Fetch Card Image Logo
 * @param {number} id Image ID
 * @returns {string} Card Image
 */
export const fetchCardImage = (id: number): string => {
    switch (id) {
        case 1:
            return EagleLogo;
        case 2:
            return ServicesLogo;
        case 3:
            return StatusesLogo;
        case 4:
            return StatusApiLogo;
        case 5:
            return WhiteLogo;
        case 6:
            return RockstarIndia;
        case 7:
            return RockstarLincoln;
        case 8:
            return RockstarLondon;
        case 9:
            return RockstarLeeds;
        case 10:
            return RockstarNewEngland;
        case 11:
            return RockstarNorth;
        case 12:
            return RockstarSanDiego;
        case 13:
            return RockstarToronto;
        case 14:
            return RockstarVancouver;
        case 15:
            return RockstarVienna;
        default:
            return RockstarGames;
    }
};

/**
 * Fetch Rockstar Status
 * @param {StatusType} status Status Type
 * @returns {StatusType} up, limited, down or undefined
 */
export const fetchStatus = (status: StatusType): StatusType => {
    switch (status?.toLowerCase()) {
        case 'up':
            return RockstarStatus.UP;
        case 'limited':
            return RockstarStatus.LIMITED;
        case 'down':
            return RockstarStatus.DOWN;
        default:
            return undefined;
    };
};

/**
 * Convert To StatusType
 * @param {string} status Status Type
 * @returns {StatusType} up, limited, down or undefined
 */
export const convertToStatus = (status: string): StatusType => {
    switch (status?.toLowerCase()) {
        case 'up':
            return RockstarStatus.UP;
        case 'down':
            return RockstarStatus.LIMITED;
        case 'limited':
            return RockstarStatus.DOWN;
        default:
            return undefined;
    };
};

/**
 * Get The Hightest Rockstar Status Count
 * @param {RockstarStatus[]} statuses RockstarStatus
 * @returns {string | number | undefined} The greatest status count
 */
export const getStatusesCount = (statuses: RockstarStatus[]): string | number | undefined => {
    return lodash.head(lodash(statuses)
        .countBy()
        .entries()
        .maxBy(lodash.last)
    );
};

/**
 * Get The Hightest Rockstar Status Count
 * @param {string[]} statuses statuses string array
 * @returns {string | number | undefined} The highest status count
 */
export const getHighestStatusCount = (statuses: string[]): string | number | undefined => {
    return lodash.head(lodash(statuses)
        .countBy()
        .entries()
        .maxBy(lodash.last)
    );
};

/**
 * @deprecated Use getStatusesCount
 */
export const checkStatuses = (statuses: any[]): RockstarStatus | undefined => {
    if (Object.values(statuses).every((s) => s?.status.toLowerCase() === 'up'))
        return RockstarStatus.UP;
    if (statuses.map((s) => s?.status.toLowerCase() === 'limited'))
        return RockstarStatus.LIMITED;
    if (statuses.map((s) => s?.status.toLowerCase() === 'down'))
        return RockstarStatus.DOWN;
};

/**
 * @deprecated Use getStatusesCount
 */
export const fetchStatusByCount = (statuses: any[]): string => {
    const count = lodash.countBy(statuses, 'status');
    let indicator: Indicator = { key: 0, value: '' };
    for (const [value, key] of Object.entries(count)) {
        indicator = { key, value };
    }
    return indicator?.value?.toLowerCase();
};

/**
 * Capitalize the first letter of a string
 * @param {string} text String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalizeFirstLetter = (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1);
};
