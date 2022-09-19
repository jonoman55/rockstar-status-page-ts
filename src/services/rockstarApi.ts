import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react';
import type { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

import { ApiBaseUrl } from '../utils';
import { getApiPath } from '../helpers';
import type { ApiPath, Api, All, Service, Status, Updated } from '../types';

/**
 * Create API Endpoint Builder Type
 */
type Builder = EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, 'rockstarApi'>;

const apiPath: ApiPath = getApiPath();

const API: ApiBaseUrl = new ApiBaseUrl(`/${apiPath}`);

const baseUrl: string = API.baseUrl;

export const rockstarApi = createApi({
    reducerPath: 'rockstarApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
    }),
    endpoints: (builder: Builder) => ({
        getApiStatus: builder.query<Api, any>({
            query: (): string | FetchArgs => ({
                url: '/',
                responseHandler: async (res: Response) => await res.json() as Api,
            }),
            transformResponse: (api: Api): Api | Promise<Api> => api as Api,
        }),
        getAll: builder.query<All, any>({
            query: (): string | FetchArgs => ({ 
                url: '/all',
                responseHandler: async (res: Response) => await res.json() as All,
            }),
            transformResponse: (all: All): All | Promise<All> => all as All,
        }),
        getUpdated: builder.query<Updated, any>({
            query: (): string | FetchArgs => ({
                url: '/updated',
                responseHandler: async (res: Response) => await res.json() as Updated,
            }),
            transformResponse: (updated: Updated): Updated | Promise<Updated> => updated as Updated,
        }),
        getServices: builder.query<Service[], any>({
            query: (): string | FetchArgs => ({
                url: '/services',
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
                url: '/statuses',
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
