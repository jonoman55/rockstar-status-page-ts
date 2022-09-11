import axios, { AxiosError, AxiosResponse } from 'axios';

import type { ApiName, ApiUrl } from '../types';

/**
 * Backend API Enum
 */
export enum API {
    HEROKU = 'heroku',
    RENDER = 'render',
    RAILWAY = 'railway'
};

/**
 * API Postfix
 * @example `/api`
 */
export const ApiPostFix: string = '/api';

/**
 * Backend API URLs
 */
export const ApiUrls: ApiUrl[] = [
    {
        id: 0,
        name: API.HEROKU,
        url: `${process.env.REACT_APP_BACKEND_API_HEROKU_URL}`,
        enabled: true
    },
    {
        id: 1,
        name: API.RENDER,
        url: `${process.env.REACT_APP_BACKEND_API_RENDER_URL}`,
        enabled: true
    },
    {
        id: 2,
        name: API.RAILWAY,
        url: `${process.env.REACT_APP_BACKEND_API_RAILWAY_URL}`,
        enabled: true
    }
];

/**
 * Attempt To Fetch All API URLs
 * @returns {Promise<AxiosResponse<any, any>[] | undefined>} Axios Promise Array
 */
export const fetchAllUrls = async (): Promise<AxiosResponse<any, any>[] | undefined> => {
    try {
        const postFix: string = ApiPostFix;
        const promises: Promise<AxiosResponse<any, any>>[] = ApiUrls.map(
            ({ url }: ApiUrl) => axios.get(url + postFix)
        );
        return await Promise.all(promises);
    } catch (error: any) {
        console.log(error);
    }
};

/**
 * Heroku Backend API URL
 */
export const heroku: ApiUrl = ApiUrls[0];
/**
 * Render Backend API URL
 */
export const render: ApiUrl = ApiUrls[1];
/**
 * Railway Backend API URL
 */
export const railway: ApiUrl = ApiUrls[2];

/**
 * Heroku Request
 */
export const herokuRequest: Promise<AxiosResponse<any, any>> = axios.get(heroku.url);
/**
 * Render Request
 */
export const renderRequest: Promise<AxiosResponse<any, any>> = axios.get(render.url);
/**
 * Railway Request
 */
export const railwayRequest: Promise<AxiosResponse<any, any>> = axios.get(railway.url);

/**
 * Log API Responses
 */
export const logApiResponses = (): void => {
    axios.all([
        herokuRequest,
        renderRequest,
        railwayRequest
    ]).then(axios.spread((...responses: AxiosResponse<any, any>[]) => {
        const responseOne = responses[0];
        const responseTwo = responses[1];
        const responseThree = responses[2];
        console.log(responseOne, responseTwo, responseThree);
    })).catch((error: AxiosError) => {
        console.log(error);
    });
};

/**
 * Fetch Base API URL
 * @returns {ApiUrl[]} ApiUrl Array
 */
export const fetchBaseUrl = (): ApiUrl[] => {
    const postFix: string = ApiPostFix;
    const promises: Promise<AxiosResponse<any, any>>[] = ApiUrls.map(
        ({ url }: ApiUrl) => axios.get(url + postFix)
    );
    const results: ApiUrl[] = [];
    promises.forEach((apiRes, index) => {
        apiRes
            .then((response) => {
                if (response.status === 200) {
                    results.push({
                        id: index,
                        url: response.config.url as string,
                        name: getApiName(response.config.url as string),
                        enabled: true,
                        reachable: true,
                    });
                }
            })
            .catch((reason) => {
                results.push({
                    id: index,
                    url: reason.config.url as string,
                    name: getApiName(reason.config.url as string),
                    enabled: false,
                    reachable: false,
                });
            });
    });
    return results;
};

/**
 * Get API Name From URL
 * @param {string} url Target URL String 
 * @returns {ApiName | undefined} ApiName or undefined
 */
export const getApiName = (url: string): ApiName | undefined => {
    if (url.includes(API.HEROKU)) return API.HEROKU;
    if (url.includes(API.RENDER)) return API.RENDER;
    if (url.includes(API.RAILWAY)) return API.RAILWAY;
    return undefined;
};
