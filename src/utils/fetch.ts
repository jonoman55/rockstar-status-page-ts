import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosStatic } from 'axios';
import { sortBy } from 'lodash';

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
 * @param {string} postFix
 * @returns {Promise<AxiosResponse<any, any>[] | undefined>} Axios Promise Array
 */
export const fetchAllUrls = async (postFix: string = '/api'): Promise<AxiosResponse<any, any>[] | undefined> => {
    try {
        const promises: Promise<AxiosResponse<any, any>>[] = ApiUrls.map(
            ({ url }: ApiUrl) => axios.get(url + postFix)
        );
        return await Promise.all(promises);
    } catch (error: any) {
        console.log(error);
    }
};

/**
 * Get All Base URL API Promises
 * @param {string} postFix URL Postfix
 * @default `/api`
 * @returns {Promise<AxiosResponse<any, any>>[]} Axios Promise Array
 */
export const getAllPromises = (postFix: string = '/api'): Promise<AxiosResponse<any, any>>[] => {
    const promises: Promise<AxiosResponse<any, any>>[] = ApiUrls.map(
        ({ url }: ApiUrl) => axios.get(url + postFix)
    );
    return promises;
};

/**
 * API Post Fix - /api
 */
export const apiPostFix: string = ApiPostFix;

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
export const herokuRequest: Promise<AxiosResponse<any, any>> = axios.get(heroku.url + apiPostFix);
/**
 * Render Request
 */
export const renderRequest: Promise<AxiosResponse<any, any>> = axios.get(render.url + apiPostFix);
/**
 * Railway Request
 */
export const railwayRequest: Promise<AxiosResponse<any, any>> = axios.get(railway.url + apiPostFix);

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
        console.log(responseOne);
        console.log(responseTwo);
        console.log(responseThree);
    })).catch((error: AxiosError) => {
        console.error(error);
    });
};

/**
 * Fetch Base API URLs
 * @param {string} postFix URL Postfix
 * @default `/api`
 * @returns {ApiUrl[]} ApiUrl Array
 */
export const fetchBaseUrls = (postFix: string = '/api'): ApiUrl[] => {
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
                        name: getApiName(response.config.url as string) as ApiName,
                        enabled: true,
                        reachable: true,
                    });
                }
            })
            .catch((reason) => {
                results.push({
                    id: index,
                    url: reason.config.url as string,
                    name: getApiName(reason.config.url as string) as ApiName,
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

// TODO : Figure out how to set the bestApiUrl
export class ApiBaseUrl {
    public baseUrl: string = '';
    public postFix: string = '/api';

    public durations: { [id: string]: number; }

    public heroku;
    public render;
    public railway;

    public bestApi: Promise<ApiUrl | ApiUrl[]>;
    public bestApiUrl: string = '';

    constructor(postFix: string) {
        this.heroku = heroku;
        this.render = render;
        this.railway = railway;

        this.postFix = postFix;

        this.durations = {};

        this.baseUrl = this.createBaseUrl(this.postFix);

        this.bestApi = this.getBestApi((bestApiUrl: string) => {
            return this.bestApiUrl = this.createApiUrl(bestApiUrl);
        });

        // this.logAllDurations();
    };
    
    setUrl = (url: string): string => {
        return this.bestApiUrl = url;
    }

    /**
     * Create URL
     * @param {string} rest Rest of the URL 
     * @returns {string} BaseURL + Rest
     */
    public createUrl = (rest: string): string => {
        return this.baseUrl + rest;
    };

    /**
     * Create Base URL
     * @param {string} postFix URL Postfix
     * @returns {string} Base URL
     */
    public createBaseUrl = (postFix: string): string => {
        return this.heroku.url + postFix;
    };

    /**
     * Create Base URL
     * @param {string} url Base URL
     * @returns {string} Base URL
     */
    public createApiUrl = (url: string): string => {
        this.bestApiUrl = url;
        return this.bestApiUrl = url;
    };
    
    /**
     * Log All API Responses
     */
    public logAllResponses = (): void => {
        logApiResponses();
    };

    /**
     * Get Heroku Request Duration
     * @returns {Promise<number>} Request Duration Promise
     */
    public getHerokuDuration = async (): Promise<number> => {
        const request = await this.createRequest(
            this.heroku.url,
            this.heroku.name
        );
        return request.duration;
    };

    /**
     * Get Render Request Duration
     * @returns {Promise<number>} Request Duration Promise
     */
    public getRenderDuration = async (): Promise<number> => {
        const request = await this.createRequest(
            this.render.url,
            this.render.name
        );
        return request.duration;
    };

    /**
     * Get Railway Request Duration
     * @returns {Promise<number>} Request Duration Promise
     */
    public getRailwayDuration = async (): Promise<number> => {
        const request = await this.createRequest(
            this.railway.url,
            this.railway.name
        );
        return request.duration;
    };

    /**
     * Create HTTP Request
     * @param {string} url URL
     * @param {string} name Name
     * @returns {Promise<AxiosResponse<any, any>>} HTTP Response
     */
    private createRequest = async (url: string, name: string): Promise<AxiosResponse<any, any>> => {
        const instance: AxiosStatic = axios;
        const config: AxiosRequestConfig = {
            baseURL: url,
            metadata: undefined
        };
        const api: AxiosHandler = new AxiosHandler(instance, config);
        const response: AxiosResponse<any, any> = await api.get(this.postFix);
        this.durations[name] = response.duration;
        return response;
    };

    /**
     * Log HTTP Request Duration (in milliseconds)
     * @param {string} name Request Name
     * @param {number} duration Request Duration
     */
    private logDuration = (name: string, duration: number): void => {
        console.log(`${name} - ${duration} ms`);
    };

    private getDurations = () => {
        return Promise.all([
            this.getHerokuDuration(),
            this.getRailwayDuration(),
            this.getRenderDuration()
        ]);
    };

    /**
     * Log All Request Durations (in milliseconds)
     */
    public logAllDurations = (): void => {
        this.getDurations().then(() => {
            console.log('Successfully Fetched Durations');
            Object.entries(this.durations).forEach(([key, value]) => {
                this.logDuration(key, value);
            });
        });
    };

    /**
     * Get Best API
     */
    public getBestApi = (callback: (url: string) => string): Promise<ApiUrl | ApiUrl[]> => {
        return new Promise((resolve, _reject) => {
            this.getDurations().then(() => {
                console.log('Successfully Fetched Durations');
                const durations: [string, number][] = sortBy(Object.entries(this.durations).map(
                    (response) => response),
                    ['duration', 'asc']
                );
                const first: [string, number] | undefined = durations.shift();
                if (first) {
                    console.log('Best API Found');
                    resolve(ApiUrls.filter(({ name }) => name === first[0]).map((value) => {
                        callback(this.bestApiUrl = value.url + this.postFix);
                        console.log('Best API URL: ' + this.bestApiUrl);
                        return {
                            ...value,
                            reachable: true,
                        } as ApiUrl;
                    }));
                } else {
                    console.log('Best API Not Found');
                    resolve(ApiUrls.map(({ name }) => durations.find(([key, _value]) => key === name)).map((value) => {
                        return {
                            ...value,
                            reachable: true,
                        } as ApiUrl;
                    }));
                }
            });
        });
    };

    /**
     * Return Best API 
     */
    // public returnBestApi = (callback: (url: string) => string) => {
    //     // return new Promise(async (resolve, _reject) => {
    //     //     const best = await this.getBestApi();
    //     //     this.bestApiUrl = (best as ApiUrl).url + this.postFix;
    //     //     return this.bestApiUrl = (best as ApiUrl).url + this.postFix;
    //     // });
    //     this.getBestApi().then((api) => {
    //         const apiUrl = (api as ApiUrl).url;
    //         callback(this.bestApiUrl = apiUrl + this.postFix);
    //     });
    // };
};

declare module 'axios' {
    export interface AxiosRequestConfig {
        metadata: any;
    }
    export interface AxiosResponse {
        duration: number;
        responseTime: number;
    }
};

export class AxiosHandler {
    public axios: AxiosInstance;
    public config: AxiosRequestConfig;
    // public responseTime: number = 0;
    public duration: number = 0;
    
    constructor(axios: AxiosStatic, config: AxiosRequestConfig) {
        this.config = config;
        this.axios = axios.create(this.config);

        this.axios.interceptors.request.use((config) => {
            config.metadata = { startTime: new Date() }
            return config;
        }, (error) => {
            return Promise.reject(error);
        });

        this.axios.interceptors.response.use((response) => {
            response.config.metadata.endTime = new Date()
            response.duration = response.config.metadata.endTime - response.config.metadata.startTime
            this.duration = response.duration;
            return response;
        }, (error) => {
            error.config.metadata.endTime = new Date();
            error.duration = error.config.metadata.endTime - error.config.metadata.startTime;
            this.duration = error.duration;
            return Promise.reject(error);
        });

        // this.axios.interceptors.request.use((response) => {
        //     // to avoid overwriting if another interceptor
        //     // already defined the same object (meta)
        //     response.metadata = response.metadata || {}
        //     response.metadata.requestStartedAt = new Date().getTime();
        //     return response;
        // });

        // this.axios.interceptors.response.use((response) => {
        //     console.log(`Execution time for: ${response.config.url} - ${new Date().getTime() - response.config.metadata.requestStartedAt} ms`);
        //     return response;
        // },
        //     // Handle 4xx & 5xx responses
        //     (error) => {
        //         console.error(
        //             `Execution time for: ${error.config.url} - ${new Date().getTime() - error.config.metadata.requestStartedAt} ms`
        //         );
        //         throw error;
        //     }
        // );

        // this.axios.interceptors.response.use((response) => {
        //     response.responseTime = new Date().getTime() - response.config.metadata.requestStartedAt;
        //     this.responseTime = response.responseTime;
        //     return response;
        // });

        // this.axios.interceptors.request.use((x) => {
        //     // to avoid overwriting if another interceptor
        //     // already defined the same object (meta)
        //     x.metadata = x.metadata || {}
        //     x.metadata.requestStartedAt = new Date().getTime();
        //     return x;
        // });

        // this.axios.interceptors.response.use((x) => {
        //     console.log(`Execution time for: ${x.config.url} - ${new Date().getTime() - x.config.metadata.requestStartedAt} ms`)
        //     return x;
        // },
        //     // Handle 4xx & 5xx responses
        //     (x) => {
        //         console.error(`Execution time for: ${x.config.url} - ${new Date().getTime() - x.config.metadata.requestStartedAt} ms`)
        //         throw x;
        //     }
        // );
    }

    /**
     * GET Request
     * @param {string} url Target URL
     * @returns {Promise<AxiosResponse<any, any>>} Axios Response Promise
     */
    get = async (url: string): Promise<AxiosResponse<any, any>> => {
        return await this.axios.get(url);
    };

    /**
     * POST Request
     * @param {string} url Target URL
     * @param {any} data Data
     * @returns {Promise<AxiosResponse<any, any>>} Axios Response Promise
     */
    post = async (url: string, data: any): Promise<AxiosResponse<any, any>> => {
        return await this.axios.post(url, data);
    };

    /**
     * PUT Request
     * @param {string} url Target URL
     * @param {any} data Data
     * @returns {Promise<AxiosResponse<any, any>>} Axios Response Promise
     */
    put = async (url: string, data: any): Promise<AxiosResponse<any, any>> => {
        return await this.axios.put(url, data);
    };

    /**
     * PATCH Request
     * @param {string} url Target URL
     * @param {any} data Data
     * @returns {Promise<AxiosResponse<any, any>>} Axios Response Promise
     */
    patch = async (url: string, data: any): Promise<AxiosResponse<any, any>> => {
        return await this.axios.patch(url, data);
    };

    /**
     * Delete Request
     * @param {string} url Target URL
     * @returns {Promise<AxiosResponse<any, any>>} Axios Response Promise
     */
    delete = async (url: string): Promise<AxiosResponse<any, any>> => {
        return await this.axios.delete(url);
    };
};
