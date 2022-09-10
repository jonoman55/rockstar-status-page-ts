import axios, { AxiosError, AxiosResponse } from 'axios';

type ApiUrl = {
    id: number;
    name: string;
    url: string;
};

export const ApiUrls: ApiUrl[] = [
    { id: 0, name: 'heroku', url: `${process.env.REACT_APP_BACKEND_API_HEROKU_URL}` },
    { id: 1, name: 'render', url: `${process.env.REACT_APP_BACKEND_API_RENDER_URL}` },
    { id: 2, name: 'railway', url: `${process.env.REACT_APP_BACKEND_API_RAILWAY_URL}` }
];

export const heroku: ApiUrl = ApiUrls[0];
export const render: ApiUrl = ApiUrls[1];
export const railway: ApiUrl = ApiUrls[2];

export const herokuRequest = axios.get(heroku.url);
export const renderRequest = axios.get(render.url);
export const railwayRequest = axios.get(heroku.url);

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

export const fetchBaseURL = async (): Promise<(string | undefined)[]> => {
    const promises: Promise<AxiosResponse<any, any>>[] = ApiUrls.map(
        ({ url }: ApiUrl) => axios.get(url + '/api')
    );
    const responses: AxiosResponse<any, any>[] = await Promise.all(promises);
    const baseURLs: (string | undefined)[] = responses.map(
        (res) => res.status === 200 ? res.config.url : undefined
    ).filter((url) =>
        url !== undefined
    );
    return baseURLs;
};