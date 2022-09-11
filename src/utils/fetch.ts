import axios, { AxiosError, AxiosResponse } from 'axios';

import type { ApiName, ApiUrl } from '../types';

const ApiUrls: ApiUrl[] = [
    {
        id: 0,
        name: 'heroku',
        url: `${process.env.REACT_APP_BACKEND_API_HEROKU_URL}`,
        enabled: true
    },
    {
        id: 1,
        name: 'render',
        url: `${process.env.REACT_APP_BACKEND_API_RENDER_URL}`,
        enabled: true
    },
    {
        id: 2,
        name: 'railway',
        url: `${process.env.REACT_APP_BACKEND_API_RAILWAY_URL}`,
        enabled: true
    }
];

export const fetchApiUrls = async (): Promise<AxiosResponse<any, any>[] | undefined> => {
    try {
        const promises: Promise<AxiosResponse<any, any>>[] = ApiUrls.map(
            ({ url }: ApiUrl) => axios.get(url + '/api')
        );
        return await Promise.all(promises);
    } catch (error: any) {
        console.log(error);
    }
};

const heroku: ApiUrl = ApiUrls[0];
const render: ApiUrl = ApiUrls[1];
const railway: ApiUrl = ApiUrls[2];

const herokuRequest = axios.get(heroku.url);
const renderRequest = axios.get(render.url);
const railwayRequest = axios.get(railway.url);

export const fetchAllUrls = (): Promise<void> => {
    return axios.all([
        herokuRequest,
        renderRequest,
        railwayRequest
    ]).then(axios.spread((...responses: AxiosResponse<any, any>[]) => {
        const responseOne = responses[0];
        const responseTwo = responses[1];
        const responseThree = responses[2];
        // use/access the results 
        console.log(responseOne, responseTwo, responseThree);
    })).catch((error: AxiosError) => {
        // react on errors.
        console.log(error);
    });
};

export const fetchBaseURL = (): ApiUrl[] => {
    const promises: Promise<AxiosResponse<any, any>>[] = ApiUrls.map(
        ({ url }: ApiUrl) => axios.get(url + '/api')
    );
    const results: ApiUrl[] = [];
    promises.forEach((apiRes, index) => {
        apiRes
            .then((response) => {
                if (response.status === 200) {
                    results.push({
                        id: index,
                        url: response.config.url as string,
                        name: getUrlName(response.config.url as string),
                        enabled: true,
                        reachable: true,
                    });
                }
            })
            .catch((reason) => {
                results.push({
                    id: index,
                    url: reason.config.url as string,
                    name: getUrlName(reason.config.url as string),
                    enabled: false,
                    reachable: false,
                });
            });
    });
    return results;
};

const getUrlName = (url: string): ApiName | undefined => {
    if (url.includes('heroku')) return 'heroku';
    if (url.includes('render')) return 'render';
    if (url.includes('railway')) return 'railway';
};
