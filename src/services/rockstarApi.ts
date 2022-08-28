import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react';
import type { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

import type { ApiPath, Api, All, Service, Status, Updated } from '../types';

/**
 * Create API Endpoint Builder Type
 */
type Builder = EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, 'rockstarApi'>;

/**
 * Get API URL Path Extension
 * @returns api or file
 */
const getApiPath = (): ApiPath => {
    if (Boolean(process.env.REACT_APP_API_TESTING) === true) {
        return 'file';
    }
    return 'api';
};

const apiPath: ApiPath = getApiPath();

const baseURL: string = process.env.REACT_APP_BACKEND_API_URL as string;

export const rockstarApi = createApi({
    reducerPath: 'rockstarApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseURL}/${apiPath}`,
    }),
    endpoints: (builder: Builder) => ({
        getApiStatus: builder.query<Api, any>({
            query: (): string | FetchArgs => ({
                url: `/`,
                responseHandler: async (res: Response) => await res.json() as Api,
            }),
            transformResponse: (api: Api): Api | Promise<Api> => api as Api,
        }),
        getAll: builder.query<All, any>({
            query: (): string | FetchArgs => ({ 
                url: `/all`,
                responseHandler: async (res: Response) => await res.json() as All,
            }),
            transformResponse: (all: All): All | Promise<All> => all as All,
        }),
        getUpdated: builder.query<Updated, any>({
            query: (): string | FetchArgs => ({
                url: `/updated`,
                responseHandler: async (res: Response) => await res.json() as Updated,
            }),
            transformResponse: (updated: Updated): Updated | Promise<Updated> => updated as Updated,
        }),
        getServices: builder.query<Service[], any>({
            query: (): string | FetchArgs => ({
                url: `/services`,
                responseHandler: async (res: Response) => await res.json() as Service[],
            }),
            transformResponse: (services: Service[]): Service[] | Promise<Service[]> => services as Service[],
        }),
        getService: builder.query<Service, any>({
            query: (id: number): string | FetchArgs => ({
                url: `/services/${id}`,
                responseHandler: async (res: Response) => await res.json() as Service,
            }),
            transformResponse: (service: Service): Service | Promise<Service> => service as Service,
        }),
        getStatuses: builder.query<Status[], any>({
            query: (): string | FetchArgs => ({
                url: `/statuses`,
                responseHandler: async (res: Response) => await res.json() as Status[],
            }),
            transformResponse: (statuses: Status[]): Status[] | Promise<Status[]> => statuses as Status[],
        }),
        getStatus: builder.query<Status, any>({
            query: (id: number): string | FetchArgs => ({
                url: `/statuses/${id}`,
                responseHandler: async (res: Response) => await res.json() as Status,
            }),
            transformResponse: (status: Status): Status | Promise<Status> => status as Status,
        }),
    }),
});

export const {
    useGetApiStatusQuery,
    useGetAllQuery,
    useGetServicesQuery,
    useGetServiceQuery,
    useGetStatusesQuery,
    useGetStatusQuery,
    useGetUpdatedQuery,
} = rockstarApi;
